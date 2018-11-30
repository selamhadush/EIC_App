using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL.DataAccessLayer;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.API.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [Route("api/ServiceWorkflowHistories")]
    public class ServiceWorkflowHistoriesController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ServiceWorkflowHistoryRepo historyRepo;

        public ServiceWorkflowHistoriesController(ApplicationDbContext context,
            ServiceWorkflowHistoryRepo serviceWorkflowHistoryRepo)
        {
            _context = context;
            historyRepo = serviceWorkflowHistoryRepo;
        }

        // GET: api/ServiceWorkflowHistories
        [HttpGet]
        public async Task<IEnumerable<ServiceWorkflowHistory>> GetServiceWorkflowHistoriesAsync()
        {
            return await historyRepo.GetServiceWorkflowHistories();
        }

        // GET: api/ServiceWorkflowHistories/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetServiceWorkflowHistory([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var serviceWorkflowHistory =
                await _context.ServiceWorkflowHistories.SingleOrDefaultAsync(m => m.ServiceWorkflowHistoryId == id);

            if (serviceWorkflowHistory == null) return NotFound();

            return Ok(serviceWorkflowHistory);
        }

        // PUT: api/ServiceWorkflowHistories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServiceWorkflowHistory([FromRoute] int id,
            [FromBody] ServiceWorkflowHistory serviceWorkflowHistory)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (id != serviceWorkflowHistory.ServiceWorkflowHistoryId) return BadRequest();

            _context.Entry(serviceWorkflowHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceWorkflowHistoryExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/ServiceWorkflowHistories
        [HttpPost]
        public async Task<IActionResult> PostServiceWorkflowHistory(
            [FromBody] ServiceWorkflowHistory serviceWorkflowHistory)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.ServiceWorkflowHistories.Add(serviceWorkflowHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServiceWorkflowHistory",
                new {id = serviceWorkflowHistory.ServiceWorkflowHistoryId}, serviceWorkflowHistory);
        }

        // DELETE: api/ServiceWorkflowHistories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiceWorkflowHistory([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var serviceWorkflowHistory =
                await _context.ServiceWorkflowHistories.SingleOrDefaultAsync(m => m.ServiceWorkflowHistoryId == id);
            if (serviceWorkflowHistory == null) return NotFound();

            _context.ServiceWorkflowHistories.Remove(serviceWorkflowHistory);
            await _context.SaveChangesAsync();

            return Ok(serviceWorkflowHistory);
        }

        private bool ServiceWorkflowHistoryExists(int id)
        {
            return _context.ServiceWorkflowHistories.Any(e => e.ServiceWorkflowHistoryId == id);
        }
    }
}