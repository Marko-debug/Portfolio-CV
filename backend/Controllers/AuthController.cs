using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authorization;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // ✅ REGISTER
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                return BadRequest("User already exists.");

            var hashed = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            var user = new User { Email = dto.Email, PasswordHash = hashed };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User created successfully." });
        }

        // ✅ LOGIN
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized("Invalid credentials.");

            var accessToken = GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken();

            var hashedRefreshToken = HashToken(refreshToken);
            _context.RefreshTokens.Add(new RefreshToken
            {
                TokenHash = hashedRefreshToken,
                ExpiresAtUtc = DateTime.UtcNow.AddDays(7),
                UserId = user.Id
            });

            await _context.SaveChangesAsync();

            // ✅ Store both cookies securely
            Response.Cookies.Append("jwt", accessToken, CookieOptionsJwt(1)); // expires in 15 mins
            Response.Cookies.Append("refreshToken", refreshToken, CookieOptionsJwt(7 * 24 * 60)); // expires in 7 days

            return Ok(new { message = "Logged in successfully" });
        }

        // ✅ REFRESH TOKEN
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            if (!Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
                return Unauthorized("Missing refresh token.");

            var hashed = HashToken(refreshToken);
            var storedToken = await _context.RefreshTokens
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.TokenHash == hashed);

            if (storedToken == null || storedToken.Revoked || storedToken.ExpiresAtUtc < DateTime.UtcNow)
                return Unauthorized("Invalid or expired refresh token.");

            // rotate token for security
            storedToken.Revoked = true;
            var newRefresh = GenerateRefreshToken();
            storedToken.ReplacedByTokenHash = HashToken(newRefresh);

            _context.RefreshTokens.Add(new RefreshToken
            {
                TokenHash = storedToken.ReplacedByTokenHash,
                ExpiresAtUtc = DateTime.UtcNow.AddDays(7),
                UserId = storedToken.UserId
            });

            var newAccessToken = GenerateJwtToken(storedToken.User!);
            await _context.SaveChangesAsync();

            // Update cookies
            Response.Cookies.Append("jwt", newAccessToken, CookieOptionsJwt(1));
            Response.Cookies.Append("refreshToken", newRefresh, CookieOptionsJwt(7 * 24 * 60));

            return Ok(new { message = "Token refreshed" });
        }

        // ✅ LOGOUT
        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            // 1️⃣ Revoke JWT if present
            var jti = User.FindFirstValue(JwtRegisteredClaimNames.Jti);
            if (jti != null)
            {
                _context.RevokedTokens.Add(new RevokedToken
                {
                    Jti = jti,
                    ExpiresAtUtc = DateTime.UtcNow.AddMinutes(15)
                });
                await _context.SaveChangesAsync();
            }

            // 2️⃣ Define consistent cookie options
            var expired = new CookieOptions
            {
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/",
                Expires = DateTime.UtcNow.AddDays(-1)
            };

            Response.Cookies.Append("jwt", "", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/",
                Expires = DateTime.UtcNow.AddDays(-1)
            });

            Response.Cookies.Append("refreshToken", "", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/",
                Expires = DateTime.UtcNow.AddDays(-1)
            });

            Response.Cookies.Append("XSRF-TOKEN", "", new CookieOptions
            {
                HttpOnly = false,
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/",
                Expires = DateTime.UtcNow.AddDays(-1)
            });

            return Ok(new { message = "Logged out and token revoked" });

        }


        // ===================== HELPERS =====================
        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(15),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // ✅ CHECK AUTH STATUS
        [HttpGet("me")]
        public IActionResult Me()
        {
            try
            {
                // Try to read JWT from cookie
                if (!Request.Cookies.TryGetValue("jwt", out var token))
                    return Unauthorized();

                var handler = new JwtSecurityTokenHandler();
                var jwt = handler.ReadJwtToken(token);

                var userId = jwt.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;
                var email = jwt.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Email)?.Value;

                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                return Ok(new { userId, email });
            }
            catch
            {
                return Unauthorized();
            }
        }


        private string GenerateRefreshToken()
        {
            var randomBytes = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomBytes);
            return Convert.ToBase64String(randomBytes);
        }

        private string HashToken(string token)
        {
            using var sha256 = SHA256.Create();
            return Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(token)));
        }

        private CookieOptions CookieOptionsJwt(int minutes)
        {
            return new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/",
                Expires = DateTime.UtcNow.AddMinutes(minutes)
            };
        }
    }

    public record UserRegisterDto(string Email, string Password);
    public record UserLoginDto(string Email, string Password);
}
