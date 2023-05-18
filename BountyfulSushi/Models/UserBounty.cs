namespace BountyfulSushi.Models
{
    public class UserBounty
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int BountyId { get; set; }
        public Bounty Bounty { get; set; }
        public User User { get; set; }
    }
}
