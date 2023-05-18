using BountyfulSushi.Models;
using BountyfulSushi.Repositories.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Tabloid.Utils;

namespace BountyfulSushi.Repositories
{
    public class BountyRepository : BaseRepository, IBountyRepository
    {
        public BountyRepository(IConfiguration configuration) : base(configuration) { }

        public List<Bounty> AdminGetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT b.Id, b.[Name], b.[Description],
	                        b.Species, b.[Location], b.Notes,
	                        b.DateCompleted, b.DifficultyId,
                            b.ImageLocation,
	                        d.[Name] AS DifficultyName,
                            d.Reward AS DifficultyReward
                        FROM Bounty b
	                        LEFT JOIN Difficulty d ON b.DifficultyId = d.Id
                        ORDER BY (CASE WHEN b.DateCompleted IS NULL THEN 0 ELSE 1 END), b.DateCompleted DESC;";
                    var reader = cmd.ExecuteReader();

                    var bounties = new List<Bounty>();

                    while (reader.Read())
                    {
                        bounties.Add(MakeBounty(reader));
                    }

                    reader.Close();

                    return bounties;
                }
            }
        }

        public List<Bounty> GetAll(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT b.Id, b.[Name], b.[Description],
	                        b.Species, b.[Location], b.Notes,
	                        b.DateCompleted, b.ImageLocation, 
                            b.DifficultyId, d.[Name] AS DifficultyName,
                            d.Reward AS DifficultyReward
                        FROM Bounty b
	                        LEFT JOIN Difficulty d ON b.DifficultyId = d.Id
                        WHERE b.DateCompleted IS NULL";
                    cmd.Parameters.AddWithValue("@userId", userId);

                    var reader = cmd.ExecuteReader();

                    var bounties = new List<Bounty>();

                    while (reader.Read())
                    {
                        bounties.Add(MakeBounty(reader));
                    }

                    reader.Close();

                    return bounties;
                }
            }
        }

        public Bounty AdminGetBountyById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT b.Id, b.[Name], b.[Description],
	                        b.Species, b.[Location], b.Notes,
	                        b.DateCompleted, b.DifficultyId,
                            b.ImageLocation,
	                        d.[Name] AS DifficultyName,
                            d.Reward AS DifficultyReward,
	                        ub.UserId, u.FireBaseId, u.UserName, 
	                        u.FirstName, u.LastName, u.Email,
                            u.ImageLocation AS UserImageLocation, u.Locked, 
	                        u.UserTypeId, ut.[Name] AS UserTypeName
                        FROM Bounty b
	                        LEFT JOIN Difficulty d ON b.DifficultyId = d.Id
	                        LEFT JOIN UserBounty ub ON ub.BountyId = b.Id
	                        LEFT JOIN [User] u ON ub.UserId = u.Id
	                        LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                        WHERE b.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Bounty bounty = null;

                    while (reader.Read())
                    {
                        if (bounty == null)
                        {
                            bounty = MakeBounty(reader);
                        }

                        if (DbUtils.IsNotDbNull(reader, "UserId"))
                        {
                            bounty.Users.Add(new User()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                                FireBaseId = reader.GetString(reader.GetOrdinal("FirebaseId")),
                                UserName = reader.GetString(reader.GetOrdinal("UserName")),
                                FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                ImageLocation = DbUtils.GetNullableString(reader, "UserImageLocation"),
                                Locked = reader.GetBoolean(reader.GetOrdinal("Locked")),
                                UserType = new UserType()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                    Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                                }
                            });

                        }
                    }

                    reader.Close();

                    return bounty;
                }
            }
        }

        public Bounty GetBountyById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT b.Id, b.[Name], b.[Description],
	                        b.Species, b.[Location], b.Notes,
	                        b.DateCompleted, b.DifficultyId,
                            b.ImageLocation,
	                        d.[Name] AS DifficultyName,
                            d.Reward AS DifficultyReward,
	                        ub.UserId
                        FROM Bounty b
	                        LEFT JOIN Difficulty d ON b.DifficultyId = d.Id
	                        LEFT JOIN UserBounty ub ON ub.BountyId = b.Id
                        WHERE b.Id = @id AND b.DateCompleted IS NULL";

                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    Bounty bounty = null;

                    while (reader.Read())
                    {
                        if (bounty == null)
                        {
                            bounty = MakeBounty(reader);
                        }

                        if (DbUtils.IsNotDbNull(reader, "UserId"))
                        {
                            bounty.Users.Add(new User()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("UserId"))
                            });

                        }
                    }

                    reader.Close();

                    return bounty;
                }
            }
        }

        public Bounty GetUserBountyById(UserBounty userBounty)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT b.Id, b.[Name], b.[Description],
	                        b.Species, b.[Location], b.Notes,
	                        b.DateCompleted, b.DifficultyId,
                            b.ImageLocation,
	                        d.[Name] AS DifficultyName,
                            d.Reward AS DifficultyReward,
	                        ub.UserId
                        FROM Bounty b
	                        LEFT JOIN Difficulty d ON b.DifficultyId = d.Id
	                        LEFT JOIN UserBounty ub ON ub.BountyId = b.Id
                        WHERE b.Id = @bountyId AND ub.UserId = @userId";

                    cmd.Parameters.AddWithValue("@bountyId", userBounty.BountyId);
                    cmd.Parameters.AddWithValue("@userId", userBounty.UserId);

                    var reader = cmd.ExecuteReader();

                    Bounty bounty = null;

                    if (reader.Read())
                    {
                        bounty = MakeBounty(reader);
                    }

                    reader.Close();

                    return bounty;
                }
            }
        }

        public List<Bounty> GetBountiesByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT b.Id, b.[Name], b.[Description],
	                        b.Species, b.[Location], b.Notes,
	                        b.DateCompleted, b.DifficultyId,
                            b.ImageLocation,
	                        d.[Name] AS DifficultyName,
                            d.Reward AS DifficultyReward
                        FROM Bounty b
	                        LEFT JOIN Difficulty d ON b.DifficultyId = d.Id
	                        LEFT JOIN UserBounty ub ON ub.BountyId = b.Id
	                        LEFT JOIN [User] u ON ub.UserId = u.Id
                        WHERE u.Id = @userId
                        ORDER BY (CASE WHEN b.DateCompleted IS NULL THEN 0 ELSE 1 END), b.DateCompleted DESC;;";

                    cmd.Parameters.AddWithValue("@userId", userId);
                    var reader = cmd.ExecuteReader();

                    var bountys = new List<Bounty>();

                    while (reader.Read())
                    {
                        bountys.Add(MakeBounty(reader));
                    }

                    reader.Close();

                    return bountys;
                }
            }
        }

        public void Add(Bounty bounty)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Bounty ( [Name], [Description], Species, [Location], Notes, ImageLocation, DifficultyId )
                        OUTPUT INSERTED.ID
                        VALUES ( @Name, @Description, @Species, @Location, @Notes, @ImageLocation, @DifficultyId )";
                    cmd.Parameters.AddWithValue("@Name", bounty.Name);
                    cmd.Parameters.AddWithValue("@Description", bounty.Description);
                    cmd.Parameters.AddWithValue("@Species", DbUtils.ValueOrDBNull(bounty.Species));
                    cmd.Parameters.AddWithValue("@Location", DbUtils.ValueOrDBNull(bounty.Location));
                    cmd.Parameters.AddWithValue("@Notes", DbUtils.ValueOrDBNull(bounty.Notes));
                    cmd.Parameters.AddWithValue("@ImageLocation", DbUtils.ValueOrDBNull(bounty.ImageLocation));
                    cmd.Parameters.AddWithValue("@DifficultyId", DbUtils.ValueOrDBNull(bounty.DifficultyId));

                    bounty.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UserAccept(UserBounty userBounty)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        IF NOT EXISTS
	                    (
		                    SELECT Id, UserId, BountyId FROM UserBounty
		                    WHERE UserId = @UserId AND BountyId = @BountyId
	                    )

	                    BEGIN
		                    INSERT INTO UserBounty ( UserId, BountyId )
                            OUTPUT INSERTED.ID
                            VALUES ( @UserId, @BountyId )
	                    END";
                    cmd.Parameters.AddWithValue("@UserId", userBounty.UserId);
                    cmd.Parameters.AddWithValue("@BountyId", userBounty.BountyId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UserRemove(UserBounty userBounty)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM UserBounty
                        WHERE UserId = @UserId AND BountyId = @BountyId;";
                    cmd.Parameters.AddWithValue("@UserId", userBounty.UserId);
                    cmd.Parameters.AddWithValue("@BountyId", userBounty.BountyId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Bounty
                        WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Bounty bounty)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Bounty
                            SET [Name] = @Name,
                                [Description] = @Description, 
                                Species = @Species,
                                [Location] = @Location,
                                Notes = @Notes,
                                ImageLocation = @ImageLocation,
                                DifficultyId = @DifficultyId
                         WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", bounty.Id);
                    cmd.Parameters.AddWithValue("@Name", bounty.Name);
                    cmd.Parameters.AddWithValue("@Description", bounty.Description);
                    cmd.Parameters.AddWithValue("@Species", DbUtils.ValueOrDBNull(bounty.Species));
                    cmd.Parameters.AddWithValue("@Location", DbUtils.ValueOrDBNull(bounty.Location));
                    cmd.Parameters.AddWithValue("@Notes", DbUtils.ValueOrDBNull(bounty.Notes));
                    cmd.Parameters.AddWithValue("@ImageLocation", DbUtils.ValueOrDBNull(bounty.ImageLocation));
                    cmd.Parameters.AddWithValue("@DifficultyId", DbUtils.ValueOrDBNull(bounty.DifficultyId));

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Complete(UserBounty userBounty)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Bounty
                            SET DateCompleted = @DateCompleted
                         WHERE Id = @BountyId

                        UPDATE [User]
                            SET Currency = Currency + @Reward
                        WHERE Id = @UserId

                        DELETE FROM UserBounty
                        WHERE BountyId = @BountyId AND UserId != @UserId;";

                    cmd.Parameters.AddWithValue("@BountyId", userBounty.BountyId);
                    cmd.Parameters.AddWithValue("@UserId", userBounty.UserId);
                    cmd.Parameters.AddWithValue("@Reward", userBounty.Bounty.Difficulty.Reward);
                    cmd.Parameters.AddWithValue("@DateCompleted", DateTime.Now);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Bounty MakeBounty(SqlDataReader reader)
        {
            Bounty bounty = new Bounty()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
                Description = reader.GetString(reader.GetOrdinal("Description")),
                Species = DbUtils.GetNullableString(reader, "Species"),
                Location = DbUtils.GetNullableString(reader, "Location"),
                Notes = DbUtils.GetNullableString(reader, "Notes"),
                ImageLocation = DbUtils.GetNullableString(reader, "ImageLocation"),
                Difficulty = new Difficulty()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("DifficultyId")),
                    Name = reader.GetString(reader.GetOrdinal("DifficultyName")),
                    Reward = reader.GetInt32(reader.GetOrdinal("DifficultyReward"))
                },
                Users = new List<User>()
            };

            if (DbUtils.IsNotDbNull(reader, "DateCompleted"))
            {
                bounty.DateCompleted = DbUtils.GetNullableDateTime(reader, "DateCompleted");
            }

            return bounty;
        }
    }
}
