using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.API.Controllers
{
    [Produces("application/json")]
    [Route("api/IncentiveLogs")]
    public class IncentiveLogsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public IncentiveLogsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/IncentiveLogs
        [HttpGet]
        public IEnumerable<IncentiveLog> GetIncentiveLogs()
        {
            return _context.IncentiveLogs;
        }

        // GET: api/IncentiveLogs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetIncentiveLog([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var incentiveLog = await _context.IncentiveLogs.SingleOrDefaultAsync(m => m.IncentiveLogId == id);

            if (incentiveLog == null) return NotFound();

            return Ok(incentiveLog);
        }

        // PUT: api/IncentiveLogs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIncentiveLog([FromRoute] int id, [FromBody] IncentiveLog incentiveLog)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (id != incentiveLog.IncentiveLogId) return BadRequest();

            _context.Entry(incentiveLog).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IncentiveLogExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/IncentiveLogs
        [HttpPost]
        public async Task<IActionResult> PostIncentiveLog([FromBody] IncentiveLog incentiveLog)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.IncentiveLogs.Add(incentiveLog);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIncentiveLog", new {id = incentiveLog.IncentiveLogId}, incentiveLog);
        }

        // DELETE: api/IncentiveLogs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncentiveLog([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var incentiveLog = await _context.IncentiveLogs.SingleOrDefaultAsync(m => m.IncentiveLogId == id);
            if (incentiveLog == null) return NotFound();

            _context.IncentiveLogs.Remove(incentiveLog);
            await _context.SaveChangesAsync();

            return Ok(incentiveLog);
        }

        private bool IncentiveLogExists(int id)
        {
            return _context.IncentiveLogs.Any(e => e.IncentiveLogId == id);
        }
    }
}