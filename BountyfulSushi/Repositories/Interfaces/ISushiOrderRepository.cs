using BountyfulSushi.Models;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace BountyfulSushi.Repositories.Interfaces
{
    public interface ISushiOrderRepository
    {
        void Add(SushiOrder sushiOrder);
        void Delete(int id);
        List<SushiOrder> GetAll();
        SushiOrder GetById(int id);
        SushiOrder MakeSushiOrder(SqlDataReader reader);
        void Update(SushiOrder sushiOrder);
    }
}