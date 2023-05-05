using BountyfulSushi.Models;
using BountyfulSushi.Repositories.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Utils;

namespace BountyfulSushi.Repositories
{
    public class BountyRepository : BaseRepository, IBountyRepository
    {
        public BountyRepository(IConfiguration configuration) : base(configuration) { }

        public List<Bounty> GetAll()
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
	                        d.[Name] AS DifficultyName
                        FROM Bounty b
	                        LEFT JOIN Difficulty d ON b.DifficultyId = d.Id";
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
	                        d.[Name] AS DifficultyName,
	                        ub.UserId, u.FireBaseId, 
	                        u.[Name] AS UserName, u.Email,
                            u.ImageLocation AS UserImageLocation, 
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
                                Name = reader.GetString(reader.GetOrdinal("UserName")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                ImageLocation = DbUtils.GetNullableString(reader, "UserImageLocation"),
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
	                        d.[Name] AS DifficultyName
                        FROM Bounty b
	                        LEFT JOIN Difficulty d ON b.DifficultyId = d.Id
	                        LEFT JOIN UserBounty ub ON ub.BountyId = b.Id
	                        LEFT JOIN [User] u ON ub.UserId = u.Id
                        WHERE u.Id = 2;";

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
                        INSERT INTO Bounty ( [Name], [Description], Species, [Location], Notes, DateCompleted, DifficultyId )
                        OUTPUT INSERTED.ID
                        VALUES ( @Name, @Description, @Species, @Location, @Notes, @DateCompleted, @DifficultyId )";
                    cmd.Parameters.AddWithValue("@Name", bounty.Name);
                    cmd.Parameters.AddWithValue("@Description", bounty.Description);
                    cmd.Parameters.AddWithValue("@Species", DbUtils.ValueOrDBNull(bounty.Species));
                    cmd.Parameters.AddWithValue("@Location", DbUtils.ValueOrDBNull(bounty.Location));
                    cmd.Parameters.AddWithValue("@Notes", DbUtils.ValueOrDBNull(bounty.Notes));
                    cmd.Parameters.AddWithValue("@DateCompleted", null);
                    cmd.Parameters.AddWithValue("@DifficultyId", DbUtils.ValueOrDBNull(bounty.Difficulty.Id));

                    bounty.Id = (int)cmd.ExecuteScalar();
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
                            SET Name = @Name,
                                Description = @Description, 
                                Species = @Species,
                                Location = @Location,
                                Notes = @Notes,
                                DateCompleted = @DateCompleted,
                                DifficultyId = @Location
                         WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", bounty.Id);
                    cmd.Parameters.AddWithValue("@Name", bounty.Name);
                    cmd.Parameters.AddWithValue("@Description", bounty.Description);
                    cmd.Parameters.AddWithValue("@Species", DbUtils.ValueOrDBNull(bounty.Species));
                    cmd.Parameters.AddWithValue("@Location", DbUtils.ValueOrDBNull(bounty.Location));
                    cmd.Parameters.AddWithValue("@Notes", DbUtils.ValueOrDBNull(bounty.Notes));
                    cmd.Parameters.AddWithValue("@DateCompleted", DbUtils.ValueOrDBNull(bounty.DateCompleted));
                    cmd.Parameters.AddWithValue("@DifficultyId", DbUtils.ValueOrDBNull(bounty.Difficulty.Id));

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
                Difficulty = new Difficulty()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("DifficultyId")),
                    Name = reader.GetString(reader.GetOrdinal("DifficultyName"))
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
