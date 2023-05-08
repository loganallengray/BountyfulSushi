using BountyfulSushi.Models;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace BountyfulSushi.Repositories.Interfaces
{
    public interface IBountyRepository
    {
        void Add(Bounty bounty);
        void Delete(int id);
        List<Bounty> AdminGetAll();
        List<Bounty> GetAll();
        List<Bounty> GetBountiesByUserId(int userProfileId);
        Bounty GetBountyById(int id);
        Bounty MakeBounty(SqlDataReader reader);
        void Update(Bounty bounty);
        void UserAccept(UserBounty userBounty);
        void UserRemove(int id);
    }
}