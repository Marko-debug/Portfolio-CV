using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CareerHubApi.Data;
using CareerHubApi.Models;

namespace CareerHubApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LanguageController : ControllerBase
{
    private readonly AppDbContext _context;

    public LanguageController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/language
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Language>>> GetLanguages()
    {
        return await _context.Languages.ToListAsync();
    }

    // POST: api/language
    [HttpPost]
    public async Task<ActionResult<Language>> CreateLanguage(Language language)
    {
        _context.Languages.Add(language);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetLanguages), new { id = language.Id }, language);
    }

    // DELETE: api/language/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLanguage(int id)
    {
        var exp = await _context.Languages.FindAsync(id);
        if (exp == null) return NotFound();

        _context.Languages.Remove(exp);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}