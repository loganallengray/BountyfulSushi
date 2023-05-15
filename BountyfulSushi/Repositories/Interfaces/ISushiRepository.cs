using BountyfulSushi.Models;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace BountyfulSushi.Repositories.Interfaces
{
    public interface ISushiRepository
    {
        void Add(Sushi sushi);
        void Delete(int id);
        List<Sushi> GetAll();
        Sushi GetById(int id);
        Sushi MakeSushi(SqlDataReader reader);
        void Update(Sushi sushi);
    }
}