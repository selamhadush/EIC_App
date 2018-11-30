using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EIC.Investment.API.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [Route("api/ProjectCosts")]
    public class ProjectCostsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ProjectCostRepository CostRepository;

        public ProjectCostsController(ApplicationDbContext context, ProjectCostRepository repository)
        {
            _context = context;
            CostRepository = repository;
        }

        // GET: api/ProjectCosts
        [HttpGet]
        public IEnumerable<ProjectCost> GetProjectCost()
        {
            return _context.ProjectCost;
        }

        // GET: api/ProjectCosts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectCost([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectCost = await _context.ProjectCost.SingleOrDefaultAsync(m => m.ProjectCostId == id);

            if (projectCost == null) return NotFound();

            return Ok(projectCost);
        }

        [HttpGet("ByProject/{id}")]
        public async Task<IActionResult> GetProjectCostByProjectID([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectCost = await _context.ProjectCost.FirstOrDefaultAsync(m => m.ProjectId == id);

            if (projectCost == null) return NotFound();

            return Ok(projectCost);
        }


        [HttpGet("ActualCost/{id}")]
        public IActionResult GetProjectActualCost([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectCost = _context.ProjectCost.Where(p => p.IsActual && p.ProjectId == id).AsEnumerable()
                .OrderByDescending(s => s.ProjectCostId);

            if (projectCost == null) return NotFound();

            return Ok(projectCost);
        }

        // PUT: api/ProjectCosts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectCost([FromRoute] int id, [FromBody] ProjectCost projectCost)
        {
            //if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}
            var editedProjectCost = projectCost;
            editedProjectCost.ProjectCostId = id;
            editedProjectCost.CreatedUserId = 1;
            editedProjectCost.IsActual = false;
            editedProjectCost.IsActive = true;
            if (id != projectCost.ProjectCostId) return BadRequest();

            ////_context.ProjectCost.Add(editedProjectCost);
            //int? workFlowId = projectCost.workFlowId;

            //if (workFlowId.HasValue)
            //{
            //  ServiceWorkflow serviceWorkflow = _context.ServiceWorkflow.First(s => s.ServiceWorkflowId == workFlowId);
            //  serviceWorkflow.NextStepId = 10;
            //  _context.Entry(serviceWorkflow).State = EntityState.Modified;
            //}

            _context.Entry(editedProjectCost).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectCostExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/ProjectCosts
        [HttpPost]
        public async Task<IActionResult> PostProjectCost([FromBody] ProjectCost projectCost)
        {
            //if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}

            var editedProjectCost = projectCost;
            editedProjectCost.CreatedUserId = 1;
            editedProjectCost.IsActual = true;

            var workFlowId = projectCost.workFlowId;
            if (workFlowId.HasValue)
            {
                editedProjectCost.IsActual = false;

                var serviceWorkflow = _context.ServiceWorkflow.First(s => s.ServiceWorkflowId == workFlowId);
                serviceWorkflow.NextStepId = 10;
                _context.Entry(serviceWorkflow).State = EntityState.Modified;
            }

            _context.ProjectCost.Add(editedProjectCost);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectCost", new {id = projectCost.ProjectCostId}, projectCost);
        }

        // DELETE: api/ProjectCosts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectCost([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectCost = await _context.ProjectCost.SingleOrDefaultAsync(m => m.ProjectCostId == id);
            if (projectCost == null) return NotFound();

            _context.ProjectCost.Remove(projectCost);
            await _context.SaveChangesAsync();

            return Ok(projectCost);
        }

        private bool ProjectCostExists(int id)
        {
            return _context.ProjectCost.Any(e => e.ProjectCostId == id);
        }
    }
}