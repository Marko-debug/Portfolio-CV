// Models/RefreshToken.cs
namespace backend.Models
{
    public class RefreshToken
    {
        public int Id { get; set; }
        public string TokenHash { get; set; } = string.Empty;
        public DateTime ExpiresAtUtc { get; set; }
        public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
        public string? ReplacedByTokenHash { get; set; } // rotation chain
        public bool Revoked { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
