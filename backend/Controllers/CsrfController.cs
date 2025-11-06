using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CsrfController : ControllerBase
    {
        [HttpGet("token")]
        public IActionResult GetCsrfToken()
        {
            // Generate a random token
            var tokenBytes = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(tokenBytes);
            var csrfToken = Convert.ToBase64String(tokenBytes);

            // Store in a HttpOnly cookie (not accessible to JS)
            Response.Cookies.Append("XSRF-TOKEN", csrfToken, new CookieOptions
            {
                HttpOnly = false,   // ⚠️ Must be accessible to frontend JS
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/",
                Expires = DateTime.UtcNow.AddMinutes(15)
            });

            return Ok(new { token = csrfToken });
        }
    }
}
