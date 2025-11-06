using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers;

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
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Language>>> GetLanguages()
    {
        return await _context.Languages.ToListAsync();
    }

    // POST: api/language
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Language>> CreateLanguage(Language language)
    {
        _context.Languages.Add(language);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetLanguages), new { id = language.Id }, language);
    }

    // DELETE: api/language/{id}
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteLanguage(int id)
    {
        var exp = await _context.Languages.FindAsync(id);
        if (exp == null) return NotFound();

        _context.Languages.Remove(exp);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}