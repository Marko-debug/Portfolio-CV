using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend.Data;
using backend.Models;

namespace backend.Controllers
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
        [RequestSizeLimit(10_000_000)] // 10 MB
        public async Task<IActionResult> UpdateProfile([FromForm] ProfileUploadDto dto)
        {
            var profile = await _context.Profiles.FirstOrDefaultAsync();

            if (profile == null)
                profile = new Profile();

            if (dto.File != null)
            {
                using var ms = new MemoryStream();
                await dto.File.CopyToAsync(ms);
                profile.Photo = ms.ToArray();
                profile.PhotoType = dto.File.ContentType;
            }

            if (!string.IsNullOrEmpty(dto.Position))
                profile.Position = dto.Position;

            if (profile.Id == 0)
                _context.Profiles.Add(profile);
            else
                _context.Profiles.Update(profile);

            await _context.SaveChangesAsync();

            string? photoUrl = null;
            if (profile.Photo != null && profile.PhotoType != null)
                photoUrl = $"data:{profile.PhotoType};base64,{Convert.ToBase64String(profile.Photo)}";

            return Ok(new { position = profile.Position, photoUrl });
        }
    }
}
