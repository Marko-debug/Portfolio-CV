namespace backend.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public string? Position { get; set; }
        public byte[]? Photo { get; set; }
        public string? PhotoType { get; set; }

        // Foreign key to User
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
