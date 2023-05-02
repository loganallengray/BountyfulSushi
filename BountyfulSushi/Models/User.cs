using System.Collections.Generic;

namespace BountyfulSushi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FireBaseId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string ImageLocation { get; set; }
        public UserType UserType { get; set; }
        public List<Bounty> Bounties { get; set; }
    }
}
