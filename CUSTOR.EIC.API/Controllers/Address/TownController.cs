using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EIC.Investment.API.Controllers.AllAddress
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [Route("api/Town")]
    public class TownController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TownController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Town
        [HttpGet]
        public IEnumerable<Town> GetTown()
        {
            return _context.Town;
        }

        // GET: api/Town/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTown([FromRoute] string id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var town = await _context.Town.SingleOrDefaultAsync(m => m.TownId == id);

            if (town == null) return NotFound();

            return Ok(town);
        }

        // PUT: api/Town/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTown([FromRoute] string id, [FromBody] Town town)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (id != town.TownId) return BadRequest();

            _context.Entry(town).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TownExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/Town
        [HttpPost]
        public async Task<IActionResult> PostTown([FromBody] Town town)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.Town.Add(town);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TownExists(town.TownId))
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                throw;
            }

            return CreatedAtAction("GetTown", new {id = town.TownId}, town);
        }

        // DELETE: api/Town/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTown([FromRoute] string id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var town = await _context.Town.SingleOrDefaultAsync(m => m.TownId == id);
            if (town == null) return NotFound();

            _context.Town.Remove(town);
            await _context.SaveChangesAsync();

            return Ok(town);
        }

        private bool TownExists(string id)
        {
            return _context.Town.Any(e => e.TownId == id);
        }
    }
}