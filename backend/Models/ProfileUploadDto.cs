using Microsoft.AspNetCore.Http;

namespace CareerHubApi.Models
{
    public class ProfileUploadDto
    {
        public IFormFile? File { get; set; }
        public string? Position { get; set; }
    }
}
