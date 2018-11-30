using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EIC.Investment.API.Controllers
{
    [Produces("application/json")]
    [Route("api/ServiceWorkflows")]
    public class ServiceWorkflowsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ServiceWorkflowsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ServiceWorkflows
        [HttpGet]
        public IEnumerable<ServiceWorkflow> GetServiceWorkflow()
        {
            return _context.ServiceWorkflow;
        }

        // GET: api/ServiceWorkflows/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetServiceWorkflow([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var serviceWorkflow = await _context.ServiceWorkflow.SingleOrDefaultAsync(m => m.ServiceWorkflowId == id);

            if (serviceWorkflow == null) return NotFound();

            return Ok(serviceWorkflow);
        }

        // PUT: api/ServiceWorkflows/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServiceWorkflow([FromRoute] int id,
            [FromBody] ServiceWorkflow serviceWorkflow)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (id != serviceWorkflow.ServiceWorkflowId) return BadRequest();

            _context.Entry(serviceWorkflow).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceWorkflowExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/ServiceWorkflows
        [HttpPost]
        public async Task<IActionResult> PostServiceWorkflow([FromBody] ServiceWorkflow serviceWorkflow)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.ServiceWorkflow.Add(serviceWorkflow);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetServiceWorkflow", new {id = serviceWorkflow.ServiceWorkflowId}, serviceWorkflow);
        }

        // DELETE: api/ServiceWorkflows/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiceWorkflow([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var serviceWorkflow = await _context.ServiceWorkflow.SingleOrDefaultAsync(m => m.ServiceWorkflowId == id);
            if (serviceWorkflow == null) return NotFound();

            _context.ServiceWorkflow.Remove(serviceWorkflow);
            await _context.SaveChangesAsync();

            return Ok(serviceWorkflow);
        }

        private bool ServiceWorkflowExists(int id)
        {
            return _context.ServiceWorkflow.Any(e => e.ServiceWorkflowId == id);
        }
    }
}