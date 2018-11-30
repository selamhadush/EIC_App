using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.API.Controllers.NewFolder
{
    [Produces("application/json")]
    [Route("api/Squences")]
    public class SquencesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SquencesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Squences
        [HttpGet]
        public IEnumerable<Squence> GetSquences()
        {
            return _context.Squences;
        }

        // GET: api/Squences/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSquence([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var squence = await _context.Squences.SingleOrDefaultAsync(m => m.ID == id);

            if (squence == null) return NotFound();

            return Ok(squence);
        }

        // PUT: api/Squences/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSquence([FromRoute] int id, [FromBody] Squence squence)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (id != squence.ID) return BadRequest();

            _context.Entry(squence).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SquenceExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/Squences
        [HttpPost]
        public async Task<IActionResult> PostSquence([FromBody] Squence squence)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.Squences.Add(squence);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSquence", new {id = squence.ID}, squence);
        }

        // DELETE: api/Squences/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSquence([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var squence = await _context.Squences.SingleOrDefaultAsync(m => m.ID == id);
            if (squence == null) return NotFound();

            _context.Squences.Remove(squence);
            await _context.SaveChangesAsync();

            return Ok(squence);
        }

        private bool SquenceExists(int id)
        {
            return _context.Squences.Any(e => e.ID == id);
        }
    }
}