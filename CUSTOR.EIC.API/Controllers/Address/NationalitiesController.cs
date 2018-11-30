using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EICOnline.DAL.EntityLayer.AllAddress;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EIC.Investment.API.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [Route("api/Nationalities")]
    public class NationalitiesController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly NationalityRepository _nationalityRepository;

        public NationalitiesController(ApplicationDbContext context, NationalityRepository repository)
        {
            _context = context;
            _nationalityRepository = repository;
        }

        // GET: api/Nationalities
        [HttpGet]
        public IEnumerable<Nationality> GetNationality()
        {
            return _nationalityRepository.GetAll();
        }

        // GET: api/Nationalities/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNationality([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var nationality = await _context.Nationality.SingleOrDefaultAsync(m => m.id == id);

            if (nationality == null) return NotFound();

            return Ok(nationality);
        }

        // PUT: api/Nationalities/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNationality([FromRoute] int id, [FromBody] Nationality nationality)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (id != nationality.id) return BadRequest();

            _context.Entry(nationality).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NationalityExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/Nationalities
        [HttpPost]
        public async Task<IActionResult> PostNationality([FromBody] Nationality nationality)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.Nationality.Add(nationality);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNationality", new {nationality.id}, nationality);
        }

        // DELETE: api/Nationalities/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNationality([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var nationality = await _context.Nationality.SingleOrDefaultAsync(m => m.id == id);
            if (nationality == null) return NotFound();

            _context.Nationality.Remove(nationality);
            await _context.SaveChangesAsync();

            return Ok(nationality);
        }

        private bool NationalityExists(int id)
        {
            return _context.Nationality.Any(e => e.id == id);
        }
    }
}