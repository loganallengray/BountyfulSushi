using BountyfulSushi.Models;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace BountyfulSushi.Repositories.Interfaces
{
    public interface IUserRepository
    {
        void Add(User user);
        List<User> GetAll();
        User GetByFirebaseUserId(string firebaseUserId);
        User GetByUserProfileId(int id);
        User MakeUser(SqlDataReader reader);
        User MakeUserWithBounties(SqlDataReader reader);
    }
}