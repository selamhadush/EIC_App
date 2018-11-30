using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.API.Controllers.Project
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [Route("api/CapitalRegistrations")]
    public class CapitalRegistrationsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CapitalRegistrationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CapitalRegistrations
        [HttpGet]
        public IEnumerable<CapitalRegistration> GetCapitalRegistrations()
        {
            return _context.CapitalRegistrations;
        }

        // GET: api/CapitalRegistrations/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCapitalRegistration([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var capitalRegistration =
                await _context.CapitalRegistrations.SingleOrDefaultAsync(m => m.CapitalRegistrationId == id);

            if (capitalRegistration == null) return NotFound();

            return Ok(capitalRegistration);
        }

        // PUT: api/CapitalRegistrations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCapitalRegistration([FromRoute] int id,
            [FromBody] CapitalRegistration capitalRegistration)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (id != capitalRegistration.CapitalRegistrationId) return BadRequest();

            _context.Entry(capitalRegistration).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction("PutCapitalRegistration", capitalRegistration);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CapitalRegistrationExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/CapitalRegistrations
        [HttpPost]
        public async Task<IActionResult> PostCapitalRegistration([FromBody] CapitalRegistration capitalRegistration)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var editedCapitalRegistration = capitalRegistration;
            editedCapitalRegistration.IsActive = true;

            _context.CapitalRegistrations.Add(editedCapitalRegistration);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCapitalRegistration", new {id = capitalRegistration.CapitalRegistrationId},
                capitalRegistration);
        }

        // DELETE: api/CapitalRegistrations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCapitalRegistration([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var capitalRegistration =
                await _context.CapitalRegistrations.SingleOrDefaultAsync(m => m.CapitalRegistrationId == id);
            if (capitalRegistration == null) return NotFound();

            _context.CapitalRegistrations.Remove(capitalRegistration);
            await _context.SaveChangesAsync();

            return Ok(capitalRegistration);
        }

        private bool CapitalRegistrationExists(int id)
        {
            return _context.CapitalRegistrations.Any(e => e.CapitalRegistrationId == id);
        }


        [HttpGet("ByProject/{id}")]
        public async Task<IActionResult> GetCapitalRegistrationByProjectID([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var capitalRegistrations = await _context.CapitalRegistrations.Where(m => m.ProjectId == id).ToListAsync();

            if (capitalRegistrations == null) return NotFound();

            return Ok(capitalRegistrations);
        }
    }
}