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
    [Route("api/ProjectRequirements")]
    public class ProjectRequirementsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private ProjectRequirementRepository Repository;

        public ProjectRequirementsController(ApplicationDbContext context,
            ProjectRequirementRepository projectRequirementRepository)
        {
            _context = context;
            Repository = projectRequirementRepository;
        }

        // GET: api/ProjectRequirements
        [HttpGet]
        public IEnumerable<ProjectRequirement> GetProjectRequirement()
        {
            return _context.ProjectRequirement;
        }

        // GET: api/ProjectRequirements/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectRequirement([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectRequirement =
                await _context.ProjectRequirement.SingleOrDefaultAsync(m => m.ProjectRequirementId == id);

            if (projectRequirement == null) return NotFound();

            return Ok(projectRequirement);
        }

        [HttpGet("ByProject/{id}")]
        public async Task<IActionResult> GetProjectCostByProjectID([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectRequirement = await _context.ProjectRequirement.SingleOrDefaultAsync(m => m.ProjectId == id);

            if (projectRequirement == null) return NotFound();

            return Ok(projectRequirement);
        }

        // PUT: api/ProjectRequirements/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectRequirement([FromRoute] int id,
            [FromBody] ProjectRequirement projectRequirement)
        {
            //if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}

            //if (id != projectRequirement.ProjectRequirementId)
            //{
            //  return BadRequest();
            //}
            var editedRequirement = projectRequirement;
            editedRequirement.CreatedUserId = 1;
            editedRequirement.ProjectRequirementId = id;
            editedRequirement.IsActive = true;

            var workFlowId = projectRequirement.workFlowId;

            var serviceWorkflow = _context.ServiceWorkflow.First(s => s.ServiceWorkflowId == workFlowId);
            serviceWorkflow.NextStepId = 9;
            _context.Entry(serviceWorkflow).State = EntityState.Modified;

            _context.Entry(editedRequirement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectRequirementExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/ProjectRequirements
        [HttpPost]
        public async Task<IActionResult> PostProjectRequirement([FromBody] ProjectRequirement projectRequirement)
        {
            //if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}
            var editedRequirement = projectRequirement;
            editedRequirement.CreatedUserId = 1;

            var workFlowId = projectRequirement.workFlowId;

            var serviceWorkflow = _context.ServiceWorkflow.First(s => s.ServiceWorkflowId == workFlowId);
            serviceWorkflow.NextStepId = 9;
            _context.Entry(serviceWorkflow).State = EntityState.Modified;

            _context.ProjectRequirement.Add(editedRequirement);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectRequirement", new {id = editedRequirement.ProjectRequirementId},
                editedRequirement);
        }

        // DELETE: api/ProjectRequirements/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectRequirement([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectRequirement =
                await _context.ProjectRequirement.SingleOrDefaultAsync(m => m.ProjectRequirementId == id);
            if (projectRequirement == null) return NotFound();

            _context.ProjectRequirement.Remove(projectRequirement);
            await _context.SaveChangesAsync();

            return Ok(projectRequirement);
        }

        private bool ProjectRequirementExists(int id)
        {
            return _context.ProjectRequirement.Any(e => e.ProjectRequirementId == id);
        }
    }
}