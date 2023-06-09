﻿using System;

namespace BountyfulSushi.Models
{
    public class SushiOrder
    {
        public int Id { get; set; }
        public int SushiId { get; set; }
        public Sushi Sushi { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTime DateCreated { get; set; }
        public Nullable<DateTime> DateCompleted { get; set; }
    }
}
