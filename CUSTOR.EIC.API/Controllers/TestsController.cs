using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.API.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [Route("api/Tests")]
    public class TestsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TestsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Tests
        [HttpGet]
        public IEnumerable<Test> GetTests()
        {
            return _context.Tests;
        }

        // GET: api/Tests/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTest([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var test = await _context.Tests.SingleOrDefaultAsync(m => m.Id == id);

            if (test == null) return NotFound();

            return Ok(test);
        }

        // PUT: api/Tests/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTest([FromRoute] int id, [FromBody] Test test)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (id != test.Id) return BadRequest();

            _context.Entry(test).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TestExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/Tests
        [HttpPost]
        public async Task<IActionResult> PostTest([FromBody] Test test)
        {
            _context.Tests.Add(test);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTest", new {id = test.Id}, test);
        }

        // DELETE: api/Tests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTest([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var test = await _context.Tests.SingleOrDefaultAsync(m => m.Id == id);
            if (test == null) return NotFound();

            _context.Tests.Remove(test);
            await _context.SaveChangesAsync();

            return Ok(test);
        }

        private bool TestExists(int id)
        {
            return _context.Tests.Any(e => e.Id == id);
        }
    }
}