using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using CareerHubApi.Data;
using CareerHubApi.Models;

namespace CareerHubApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Protect the endpoint
    public class ProfileController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProfileController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [RequestSizeLimit(10_000_000)]
        public async Task<IActionResult> UpdateProfile([FromForm] IFormFile? file, [FromForm] string? position)
        {
            // ✅ Correctly extract user ID from JWT
            var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub);
            if (userIdClaim == null)
                return Unauthorized("Missing user ID in token.");

            int userId = int.Parse(userIdClaim.Value);

            var profile = await _context.Profiles.FirstOrDefaultAsync(p => p.UserId == userId);
            if (profile == null)
            {
                profile = new Profile { UserId = userId };
                _context.Profiles.Add(profile);
            }

            if (file != null)
            {
                using var ms = new MemoryStream();
                await file.CopyToAsync(ms);
                profile.Photo = ms.ToArray();
                profile.PhotoType = file.ContentType;
            }

            if (!string.IsNullOrEmpty(position))
                profile.Position = position;

            await _context.SaveChangesAsync();

            string? photoUrl = null;
            if (profile.Photo != null && profile.PhotoType != null)
                photoUrl = $"data:{profile.PhotoType};base64,{Convert.ToBase64String(profile.Photo)}";

            return Ok(new { position = profile.Position, photoUrl });
        }
    }
}
