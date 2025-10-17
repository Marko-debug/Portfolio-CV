namespace CareerHubApi.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;

        // 1:1 relation to Profile
        public Profile? Profile { get; set; }
    }
}
