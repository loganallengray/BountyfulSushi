using BountyfulSushi.Models;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace BountyfulSushi.Repositories.Interfaces
{
    public interface IDifficultyRepository
    {
        void Add(Difficulty difficulty);
        void Delete(int id);
        List<Difficulty> GetAll();
        Difficulty GetDifficultyById(int id);
        Difficulty MakeDifficulty(SqlDataReader reader);
        void Update(Difficulty difficulty);
    }
}