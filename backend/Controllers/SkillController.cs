using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CareerHubApi.Data;
using CareerHubApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace CareerHubApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SkillController : ControllerBase
{
    private readonly AppDbContext _context;

    public SkillController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/skill
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Skill>>> GetSkills()
    {
        return await _context.Skills.ToListAsync();
    }

    // POST: api/skill
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Skill>> CreateSkill(Skill skill)
    {
        _context.Skills.Add(skill);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSkills), new { id = skill.Id }, skill);
    }

    // DELETE: api/skill/{id}
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteSkill(int id)
    {
        var exp = await _context.Skills.FindAsync(id);
        if (exp == null) return NotFound();

        _context.Skills.Remove(exp);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}