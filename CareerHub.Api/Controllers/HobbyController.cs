using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CareerHubApi.Data;
using CareerHubApi.Models;

namespace CareerHubApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HobbyController : ControllerBase
{
    private readonly AppDbContext _context;

    public HobbyController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/hobby
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Hobby>>> GetHobbies()
    {
        return await _context.Hobbies.ToListAsync();
    }

    // POST: api/hobby
    [HttpPost]
    public async Task<ActionResult<Hobby>> CreateHobby(Hobby hobby)
    {
        _context.Hobbies.Add(hobby);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetHobbies), new { id = hobby.Id }, hobby);
    }

    // DELETE: api/hobby/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteHobby(int id)
    {
        var exp = await _context.Hobbies.FindAsync(id);
        if (exp == null) return NotFound();

        _context.Hobbies.Remove(exp);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}