using BountyfulSushi.Models;
using BountyfulSushi.Repositories.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Utils;

namespace BountyfulSushi.Repositories
{
    public class SushiRepository : BaseRepository, ISushiRepository
    {
        public SushiRepository(IConfiguration configuration) : base(configuration) { }

        public List<Sushi> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT s.Id, s.[Name], s.[Description],
	                        s.Price, s.Inventory, s.ImageLocation,
	                        s.BountyId,
	                        b.[Name] AS BountyName, 
	                        b.[Description] AS BountyDescription,
	                        b.Species, b.[Location], b.Notes,
	                        b.ImageLocation AS BountyImageLocation
                        FROM Sushi s
	                        LEFT JOIN Bounty b ON b.Id = s.BountyId";
                    var reader = cmd.ExecuteReader();

                    var sushi = new List<Sushi>();

                    while (reader.Read())
                    {
                        sushi.Add(MakeSushi(reader));
                    }

                    reader.Close();

                    return sushi;
                }
            }
        }

        public Sushi GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT s.Id, s.[Name], s.[Description],
	                        s.Price, s.Inventory, s.ImageLocation,
	                        s.BountyId,
	                        b.[Name] AS BountyName, 
	                        b.[Description] AS BountyDescription,
	                        b.Species, b.[Location], b.Notes,
	                        b.ImageLocation AS BountyImageLocation,
	                        u.UserName
                        FROM Sushi s
	                        LEFT JOIN Bounty b ON b.Id = s.BountyId
	                        LEFT JOIN UserBounty ub ON ub.BountyId = b.Id 
	                        LEFT JOIN [User] u ON u.Id = ub.UserId
                        WHERE s.Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    var sushi = new Sushi();

                    if (reader.Read())
                    {
                        sushi = MakeSushi(reader);

                        if (DbUtils.IsNotDbNull(reader, "UserName"))
                        {
                            sushi.Bounty.Users.Add(new User
                            {
                                UserName = reader.GetString(reader.GetOrdinal("UserName"))
                            });
                        }
                    }

                    reader.Close();

                    return sushi;
                }
            }
        }

        public void Add(Sushi sushi)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Sushi ( [Name], [Description], Price, Inventory, ImageLocation, BountyId )
                        OUTPUT INSERTED.ID
                        VALUES ( @Name, @Description, @Price, @Inventory, @ImageLocation, @BountyId )";
                    cmd.Parameters.AddWithValue("@Name", sushi.Name);
                    cmd.Parameters.AddWithValue("@Description", sushi.Description);
                    cmd.Parameters.AddWithValue("@Price", sushi.Price);
                    cmd.Parameters.AddWithValue("@Inventory", sushi.Inventory);
                    cmd.Parameters.AddWithValue("@ImageLocation", DbUtils.ValueOrDBNull(sushi.ImageLocation));
                    cmd.Parameters.AddWithValue("@BountyId", DbUtils.ValueOrDBNull(sushi.BountyId));

                    sushi.Id = (int)cmd.ExecuteScalar();
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
                        DELETE FROM Sushi
                        WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Sushi sushi)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Sushi
                            SET [Name] = @Name,
                                [Description] = @Description, 
                                Price = @Price,
                                Inventory = @Inventory,
                                ImageLocation = @ImageLocation,
                                BountyId = @BountyId
                         WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", sushi.Id);
                    cmd.Parameters.AddWithValue("@Name", sushi.Name);
                    cmd.Parameters.AddWithValue("@Description", sushi.Description);
                    cmd.Parameters.AddWithValue("@Price", sushi.Price);
                    cmd.Parameters.AddWithValue("@Inventory", sushi.Inventory);
                    cmd.Parameters.AddWithValue("@ImageLocation", DbUtils.ValueOrDBNull(sushi.ImageLocation));
                    cmd.Parameters.AddWithValue("@BountyId", DbUtils.ValueOrDBNull(sushi.BountyId));

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Sushi MakeSushi(SqlDataReader reader)
        {
            Sushi sushi = new Sushi()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
                Description = reader.GetString(reader.GetOrdinal("Description")),
                Price = reader.GetInt32(reader.GetOrdinal("Price")),
                Inventory = reader.GetInt32(reader.GetOrdinal("Inventory")),
                ImageLocation = DbUtils.GetNullableString(reader, "ImageLocation"),
                Bounty = new Bounty()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("BountyId")),
                    Name = reader.GetString(reader.GetOrdinal("BountyName")),
                    Description = reader.GetString(reader.GetOrdinal("BountyDescription")),
                    Species = DbUtils.GetNullableString(reader, "Species"),
                    Location = DbUtils.GetNullableString(reader, "Location"),
                    Notes = DbUtils.GetNullableString(reader, "Notes"),
                    ImageLocation = DbUtils.GetNullableString(reader, "BountyImageLocation"),
                    Users = new List<User>()
                }
            };

            return sushi;
        }
    }
}
