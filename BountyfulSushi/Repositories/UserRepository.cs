using Azure;
using BountyfulSushi.Models;
using BountyfulSushi.Repositories.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Utils;

namespace BountyfulSushi.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public List<User> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.FireBaseId, u.UserName, 
                            u.FirstName, u.LastName, u.Email,
                            u.ImageLocation, u.Locked,
                            u.UserTypeId, ut.[Name] AS UserTypeName
                        FROM [User] u
                            LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                        ORDER BY ut.Id, u.UserName;";
                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();

                    while (reader.Read())
                    {
                        users.Add(MakeUser(reader));
                    }
                    reader.Close();

                    return users;
                }
            }
        }

        public List<UserType> GetUserTypes()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name
                        FROM UserType;";
                    var reader = cmd.ExecuteReader();

                    var userTypes = new List<UserType>();

                    while (reader.Read())
                    {
                        userTypes.Add(MakeUserType(reader));
                    }
                    reader.Close();

                    return userTypes;
                }
            }
        }

        public User GetByFireBaseId(string fireBaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.FireBaseId, u.UserName, 
                            u.FirstName, u.LastName, u.Email,
                            u.ImageLocation, u.Locked,
                            u.UserTypeId, ut.[Name] AS UserTypeName
                        FROM [User] u
                            LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE FireBaseId = @FireBaseId";

                    DbUtils.AddParameter(cmd, "@FireBaseId", fireBaseId);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = MakeUser(reader);
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public User GetByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.FireBaseId, u.UserName, 
                            u.FirstName, u.LastName, u.Email,
                            u.ImageLocation, u.Locked,
                            u.UserTypeId, ut.[Name] AS UserTypeName,
                            ub.BountyId, b.[Name] AS BountyName,
                            b.[Description] AS BountyDescription,
                            b.Species, b.Location, b.Notes,
                            b.DateCompleted, b.ImageLocation, b.DifficultyId, 
                            d.[Name] as DifficultyName
                        FROM [User] u
                            LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                            LEFT JOIN UserBounty ub ON ub.UserId = u.Id
                            LEFT JOIN Bounty b ON ub.BountyId = b.Id
                            LEFT JOIN Difficulty d ON b.DifficultyId = d.Id
                        WHERE u.Id = @id;";

                    DbUtils.AddParameter(cmd, "@id", id);

                    User user = null;

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        if (user == null)
                        {
                            user = MakeUser(reader);
                        }

                        if (DbUtils.IsNotDbNull(reader, "BountyId"))
                        {
                            Bounty bounty = new Bounty()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("BountyId")),
                                Name = reader.GetString(reader.GetOrdinal("BountyName")),
                                Description = reader.GetString(reader.GetOrdinal("BountyDescription")),
                                Species = reader.GetString(reader.GetOrdinal("Species")),
                                Location = reader.GetString(reader.GetOrdinal("Location")),
                                Notes = reader.GetString(reader.GetOrdinal("Notes")),
                                ImageLocation = reader.GetString(reader.GetOrdinal("ImageLocation")),
                                Difficulty = new Difficulty()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("DifficultyId")),
                                    Name = reader.GetString(reader.GetOrdinal("DifficultyName"))
                                }
                            };

                            if (DbUtils.IsNotDbNull(reader, "DateCompleted"))
                            {
                                bounty.DateCompleted = DbUtils.GetNullableDateTime(reader, "DateCompleted");
                            }

                            user.Bounties.Add(bounty);
                        }
                    }

                    reader.Close();

                    return user;
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [User] (FireBaseId, UserName, FirstName, LastName, Email, ImageLocation, Locked, UserTypeId)
                        OUTPUT INSERTED.ID
                        VALUES (@FireBaseId, @UserName, @FirstName, @LastName, @Email, @ImageLocation, @Locked, @UserTypeId)";

                    DbUtils.AddParameter(cmd, "@FireBaseId", user.FireBaseId);
                    DbUtils.AddParameter(cmd, "@UserName", user.UserName);
                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@ImageLocation", user.ImageLocation);
                    DbUtils.AddParameter(cmd, "@Locked", user.Locked);
                    DbUtils.AddParameter(cmd, "@UserTypeId", user.UserType.Id);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [User]
                            SET UserName = @UserName,
                                FirstName = @FirstName, 
                                LastName = @LastName,
                                Email = @Email,
                                ImageLocation = @ImageLocation,
                                UserTypeId = @UserTypeId
                         WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", user.Id);
                    cmd.Parameters.AddWithValue("@UserName", user.UserName);
                    cmd.Parameters.AddWithValue("@FirstName", user.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", DbUtils.ValueOrDBNull(user.LastName));
                    cmd.Parameters.AddWithValue("@Email", DbUtils.ValueOrDBNull(user.Email));
                    cmd.Parameters.AddWithValue("@ImageLocation", DbUtils.ValueOrDBNull(user.ImageLocation));
                    cmd.Parameters.AddWithValue("@UserTypeId", DbUtils.ValueOrDBNull(user.UserType.Id));

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public User MakeUser(SqlDataReader reader)
        {
            return new User()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                FireBaseId = reader.GetString(reader.GetOrdinal("FirebaseId")),
                UserName = reader.GetString(reader.GetOrdinal("UserName")),
                FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                LastName = reader.GetString(reader.GetOrdinal("LastName")),
                Email = reader.GetString(reader.GetOrdinal("Email")),
                Locked = reader.GetBoolean(reader.GetOrdinal("Locked")),
                ImageLocation = DbUtils.GetNullableString(reader, "ImageLocation"),
                UserType = new UserType()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                    Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                },
                Bounties = new List<Bounty>()
            };
        }

        public UserType MakeUserType(SqlDataReader reader)
        {
            return new UserType()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name"))
            };
        }
    }
}
