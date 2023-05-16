namespace BountyfulSushi.Models
{
    public class Sushi
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int Inventory { get; set; }
        public string ImageLocation { get; set; }
        public int BountyId { get; set; }
        public Bounty Bounty { get; set; }
    }
}
