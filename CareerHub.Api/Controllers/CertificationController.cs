using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CareerHubApi.Data;
using CareerHubApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace CareerHubApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CertificationController : ControllerBase
{
    private readonly AppDbContext _context;

    public CertificationController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/certification
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Certification>>> GetCertifications()
    {
        return await _context.Certifications.ToListAsync();
    }

    // POST: api/certification
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Certification>> CreateCertification(Certification certification)
    {
        _context.Certifications.Add(certification);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCertifications), new { id = certification.Id }, certification);
    }

    // DELETE: api/certification/{id}
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteCertification(int id)
    {
        var exp = await _context.Certifications.FindAsync(id);
        if (exp == null) return NotFound();

        _context.Certifications.Remove(exp);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}