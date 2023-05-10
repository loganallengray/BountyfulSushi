using System;
using System.Collections.Generic;

namespace BountyfulSushi.Models
{
    public class Bounty
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Species { get; set; }
        public string Location { get; set; }
        public string Notes { get; set; }
        public Nullable<DateTime> DateCompleted { get; set; }
        public string ImageLocation { get; set; }
        public int DifficultyId { get; set; }
        public Difficulty Difficulty { get; set; }
        public List<User> Users { get; set; }
    }
}
