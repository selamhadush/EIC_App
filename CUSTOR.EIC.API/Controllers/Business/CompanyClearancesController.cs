using System.Collections.Generic;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EICOnline.DAL.EntityLayer.business;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.API.Controllers.Business
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [Route("api/CompanyClearances")]
    public class CompanyClearancesController : Controller
    {
        private readonly ApplicationDbContext _context;


        public CompanyClearancesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CompanyClearances
        [HttpGet]
        public IEnumerable<CompanyClearance> GetCapitalRegistrations()
        {
            return _context.CompanyClearances;
        }

        // GET: api/CompanyClearances/5

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompanyNames([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var capitalRegistration =
                await _context.CompanyClearances.SingleOrDefaultAsync(m => m.CompanyClearanceId == id);

            if (capitalRegistration == null) return NotFound();

            return Ok(capitalRegistration);
        }

        // POST: api/CompanyClearances
        [HttpPost]
        public async Task<IActionResult> PostCompanyClearance([FromBody] CompanyClearance companyClearance)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var editedCompanyClearance = companyClearance;
            editedCompanyClearance.IsActive = true;

            _context.CompanyClearances.Add(editedCompanyClearance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCapitalRegistrations", new {id = editedCompanyClearance.CompanyClearanceId},
                editedCompanyClearance);
        }


        // PUT: api/CompanyClearances/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompanyClearance([FromRoute] int id,
            [FromBody] CompanyClearance companyClearance)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (id != companyClearance.CompanyClearanceId) return BadRequest();

            _context.Entry(companyClearance).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            return CreatedAtAction("GetCapitalRegistrations", companyClearance);

            return NoContent();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}