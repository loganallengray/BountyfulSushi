using BountyfulSushi.Models;
using BountyfulSushi.Repositories.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Utils;

namespace BountyfulSushi.Repositories
{
    public class DifficultyRepository : BaseRepository, IDifficultyRepository
    {
        public DifficultyRepository(IConfiguration configuration) : base(configuration) { }

        public List<Difficulty> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
	                        Id, [Name] 
                        FROM Difficulty;";
                    var reader = cmd.ExecuteReader();

                    var difficulties = new List<Difficulty>();

                    while (reader.Read())
                    {
                        difficulties.Add(MakeDifficulty(reader));
                    }

                    reader.Close();

                    return difficulties;
                }
            }
        }

        public Difficulty GetDifficultyById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT 
	                        Id, [Name] 
                        FROM Difficulty;
                        WHERE Id = @id;";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Difficulty difficulty = null;

                    while (reader.Read())
                    {
                        difficulty = MakeDifficulty(reader);
                    }

                    reader.Close();

                    return difficulty;
                }
            }
        }

        public void Add(Difficulty difficulty)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Difficulty ( [Name] )
                        OUTPUT INSERTED.ID
                        VALUES ( @Name )";
                    cmd.Parameters.AddWithValue("@Name", difficulty.Name);

                    difficulty.Id = (int)cmd.ExecuteScalar();
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
                        WHERE DifficultyId = @id

                        DELETE FROM Difficulty
                        WHERE Id = @id
                    ";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Difficulty difficulty)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Difficulty
                            SET Name = @Name
                         WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", difficulty.Id);
                    cmd.Parameters.AddWithValue("@Name", difficulty.Name);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Difficulty MakeDifficulty(SqlDataReader reader)
        {
            Difficulty difficulty = new Difficulty()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Name = reader.GetString(reader.GetOrdinal("Name")),
            };

            return difficulty;
        }
    }
}
