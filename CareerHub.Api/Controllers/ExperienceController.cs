using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CareerHubApi.Data;
using CareerHubApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace CareerHubApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExperienceController : ControllerBase
{
    private readonly AppDbContext _context;

    public ExperienceController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/experience
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Experience>>> GetExperiences()
    {
        return await _context.Experiences.ToListAsync();
    }

    // POST: api/experience
    // Protected - only logged-in users can add
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Experience>> CreateExperience(Experience experience)
    {
        _context.Experiences.Add(experience);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetExperiences), new { id = experience.Id }, experience);
    }

    // DELETE: api/experience/{id}
    // Protected - only logged-in users can delete
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteExperience(int id)
    {
        var exp = await _context.Experiences.FindAsync(id);
        if (exp == null) return NotFound();

        _context.Experiences.Remove(exp);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
