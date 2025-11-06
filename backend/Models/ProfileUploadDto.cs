using Microsoft.AspNetCore.Http;

namespace backend.Models
{
    public class ProfileUploadDto
    {
        public IFormFile? File { get; set; }
        public string? Position { get; set; }
    }
}
