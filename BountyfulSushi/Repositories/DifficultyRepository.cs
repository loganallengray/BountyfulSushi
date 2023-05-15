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
	                        Id, [Name], Reward
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
	                        Id, [Name], Reward
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
                        INSERT INTO Difficulty ( [Name], Reward )
                        OUTPUT INSERTED.ID
                        VALUES ( @Name, @Reward )";
                    cmd.Parameters.AddWithValue("@Name", difficulty.Name);
                    cmd.Parameters.AddWithValue("@Reward", difficulty.Reward);

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
                            SET Name = @Name,
                            SET Reward = @Reward
                         WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", difficulty.Id);
                    cmd.Parameters.AddWithValue("@Name", difficulty.Name);
                    cmd.Parameters.AddWithValue("@Reward", difficulty.Reward);

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
                Reward = reader.GetInt32(reader.GetOrdinal("Reward"))
            };

            return difficulty;
        }
    }
}
