using BountyfulSushi.Models;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;

namespace BountyfulSushi.Repositories.Interfaces
{
    public interface IUserRepository
    {
        void Add(User user);
        void Update(User user);
        void ToggleLock(int id);
        List<User> GetAll();
        List<UserType> GetUserTypes();
        User GetByFireBaseId(string fireBaseId);
        User GetByUserId(int id);
    }
}