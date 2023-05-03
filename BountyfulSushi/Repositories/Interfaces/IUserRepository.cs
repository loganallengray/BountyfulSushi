using BountyfulSushi.Models;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace BountyfulSushi.Repositories.Interfaces
{
    public interface IUserRepository
    {
        void Add(User user);
        List<User> GetAll();
        User GetByFireBaseId(string fireBaseId);
        User GetByUserId(int id);
    }
}