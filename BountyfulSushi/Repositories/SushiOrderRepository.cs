using BountyfulSushi.Models;
using BountyfulSushi.Repositories.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Tabloid.Utils;

namespace BountyfulSushi.Repositories
{
    public class SushiOrderRepository : BaseRepository, ISushiOrderRepository
    {
        public SushiOrderRepository(IConfiguration configuration) : base(configuration) { }

        public List<SushiOrder> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT so.Id, so.SushiId, so.DateCreated,
                            so.DateCompleted, s.[Name] AS SushiName, 
	                        s.[Description] AS SushiDescription,
	                        s.Price, s.Inventory, 
	                        s.ImageLocation AS SushiImageLocation,
	                        s.BountyId,
	                        b.[Name] AS BountyName, 
	                        b.[Description] AS BountyDescription,
	                        b.Species, b.[Location], b.Notes,
	                        b.ImageLocation AS BountyImageLocation,
	                        so.UserId, u.FireBaseId, u.UserName, 
                            u.FirstName, u.LastName, u.Email,
                            u.ImageLocation AS UserImageLocation,
	                        u.Locked,
	                        ut.Id AS UserTypeId, ut.[Name] AS UserTypeName
                        FROM SushiOrder so
	                        LEFT JOIN Sushi s ON s.id = so.SushiId
	                        LEFT JOIN Bounty b ON b.Id = s.BountyId
	                        LEFT JOIN [User] u ON u.Id = so.UserId
	                        LEFT JOIN UserType ut ON ut.Id = u.UserTypeId
                        ORDER BY (CASE WHEN so.DateCompleted IS NULL THEN 0 ELSE 1 END), so.DateCreated DESC;";
                    var reader = cmd.ExecuteReader();

                    var sushiOrders = new List<SushiOrder>();

                    while (reader.Read())
                    {
                        sushiOrders.Add(MakeSushiOrder(reader));
                    }

                    reader.Close();

                    return sushiOrders;
                }
            }
        }

        public List<SushiOrder> GetByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT so.Id, so.SushiId, so.DateCreated,
                            so.DateCompleted, s.[Name] AS SushiName, 
	                        s.[Description] AS SushiDescription,
	                        s.Price, s.Inventory, 
	                        s.ImageLocation AS SushiImageLocation,
	                        s.BountyId,
	                        b.[Name] AS BountyName, 
	                        b.[Description] AS BountyDescription,
	                        b.Species, b.[Location], b.Notes,
	                        b.ImageLocation AS BountyImageLocation,
	                        so.UserId, u.FireBaseId, u.UserName, 
                            u.FirstName, u.LastName, u.Email,
                            u.ImageLocation AS UserImageLocation,
	                        u.Locked,
	                        ut.Id AS UserTypeId, ut.[Name] AS UserTypeName
                        FROM SushiOrder so
	                        LEFT JOIN Sushi s ON s.id = so.SushiId
	                        LEFT JOIN Bounty b ON b.Id = s.BountyId
	                        LEFT JOIN [User] u ON u.Id = so.UserId
	                        LEFT JOIN UserType ut ON ut.Id = u.UserTypeId
                        WHERE so.UserId = @UserId
                        ORDER BY (CASE WHEN so.DateCompleted IS NULL THEN 0 ELSE 1 END), so.DateCreated DESC;";
                    cmd.Parameters.AddWithValue("@UserId", id);

                    var reader = cmd.ExecuteReader();

                    var sushiOrders = new List<SushiOrder>();

                    while (reader.Read())
                    {
                        sushiOrders.Add(MakeSushiOrder(reader));
                    }

                    reader.Close();

                    return sushiOrders;
                }
            }
        }

        public void Add(SushiOrder sushiOrder)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO SushiOrder ( SushiId, UserId, DateCreated )
                        OUTPUT INSERTED.ID
                        VALUES ( @SushiId, @UserId, @DateCreated )

                        UPDATE [User]
                            SET Currency = Currency - @Price
                        WHERE Id = @UserId;";
                    cmd.Parameters.AddWithValue("@SushiId", sushiOrder.SushiId);
                    cmd.Parameters.AddWithValue("@UserId", sushiOrder.UserId);
                    cmd.Parameters.AddWithValue("@DateCreated", DateTime.Now);
                    cmd.Parameters.AddWithValue("@Price", sushiOrder.Sushi.Price);

                    sushiOrder.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(SushiOrder sushiOrder)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM SushiOrder
                        WHERE Id = @id
                        
                        IF NOT EXISTS (
	                        SELECT * 
	                        FROM SushiOrder
	                        WHERE Id = @id AND DateCompleted IS NOT NULL
                        )
                        
                        BEGIN
                            UPDATE [User]
                                SET Currency = Currency + @Price
                            WHERE Id = @UserId
                        END;
                    ";
                    cmd.Parameters.AddWithValue("@id", sushiOrder.Id);
                    cmd.Parameters.AddWithValue("@UserId", sushiOrder.User.Id);
                    cmd.Parameters.AddWithValue("@Price", sushiOrder.Sushi.Price);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(SushiOrder sushiOrder)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE SushiOrder
                            SET SushiId = @SushiId,
                                UserId = @UserId 
                         WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Id", sushiOrder.Id);
                    cmd.Parameters.AddWithValue("@SushiId", sushiOrder.SushiId);
                    cmd.Parameters.AddWithValue("@UserId", sushiOrder.UserId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Complete(SushiOrder sushiOrder)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE SushiOrder
                            SET DateCompleted = @DateCompleted
                        WHERE Id = @SushiOrderId

                        UPDATE Sushi
                            SET Inventory = Inventory - 1
                        WHERE Id = @SushiId;";

                    cmd.Parameters.AddWithValue("@SushiOrderId", sushiOrder.Id);
                    cmd.Parameters.AddWithValue("@DateCompleted", DateTime.Now);
                    cmd.Parameters.AddWithValue("@SushiId", sushiOrder.SushiId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public SushiOrder MakeSushiOrder(SqlDataReader reader)
        {
            SushiOrder sushiOrder = new SushiOrder()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                SushiId = reader.GetInt32(reader.GetOrdinal("SushiId")),
                DateCreated = reader.GetDateTime(reader.GetOrdinal("DateCreated")),
                Sushi = new Sushi()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("SushiId")),
                    Name = reader.GetString(reader.GetOrdinal("SushiName")),
                    Description = reader.GetString(reader.GetOrdinal("SushiDescription")),
                    Price = reader.GetInt32(reader.GetOrdinal("Price")),
                    Inventory = reader.GetInt32(reader.GetOrdinal("Inventory")),
                    ImageLocation = DbUtils.GetNullableString(reader, "SushiImageLocation"),
                    Bounty = new Bounty()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("BountyId")),
                        Name = reader.GetString(reader.GetOrdinal("BountyName")),
                        Description = reader.GetString(reader.GetOrdinal("BountyDescription")),
                        Species = DbUtils.GetNullableString(reader, "Species"),
                        Location = DbUtils.GetNullableString(reader, "Location"),
                        Notes = DbUtils.GetNullableString(reader, "Notes"),
                        ImageLocation = DbUtils.GetNullableString(reader, "BountyImageLocation")
                    }
                },
                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                User = new User()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserId")),
                    FireBaseId = reader.GetString(reader.GetOrdinal("FirebaseId")),
                    UserName = reader.GetString(reader.GetOrdinal("UserName")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    Locked = reader.GetBoolean(reader.GetOrdinal("Locked")),
                    ImageLocation = DbUtils.GetNullableString(reader, "UserImageLocation"),
                    UserType = new UserType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                    },
                    Bounties = new List<Bounty>()
                }
            };

            if (DbUtils.IsNotDbNull(reader, "DateCompleted"))
            {
                sushiOrder.DateCompleted = DbUtils.GetNullableDateTime(reader, "DateCompleted");
            }

            return sushiOrder;
        }
    }
}
