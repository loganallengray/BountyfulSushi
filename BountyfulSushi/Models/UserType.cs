namespace BountyfulSushi.Models
{
    public class UserType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public static int ADMIN_ID => 1;
        public static int USER_ID => 2;
    }
}
