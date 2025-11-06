using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EducationController : ControllerBase
{
    private readonly AppDbContext _context;

    public EducationController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/education
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Education>>> GetEducations()
    {
        return await _context.Educations.ToListAsync();
    }

    // POST: api/education
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Education>> CreateEducation(Education education)
    {
        _context.Educations.Add(education);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEducations), new { id = education.Id }, education);
    }

    // DELETE: api/education/{id}
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteEducation(int id)
    {
        var exp = await _context.Educations.FindAsync(id);
        if (exp == null) return NotFound();

        _context.Educations.Remove(exp);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}