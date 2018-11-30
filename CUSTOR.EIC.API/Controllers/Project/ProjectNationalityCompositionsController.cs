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
    [Route("api/ProjectNationalityCompositions")]
    public class ProjectNationalityCompositionsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ProjectNationalityCompositionRepository CompositionRepository;

        public ProjectNationalityCompositionsController(ApplicationDbContext context,
            ProjectNationalityCompositionRepository repository)
        {
            _context = context;
            CompositionRepository = repository;
        }

        // GET: api/ProjectNationalityCompositions
        [HttpGet]
        public IEnumerable<ProjectNationalityComposition> GetProjectNationalityComposition()
        {
            return _context.ProjectNationalityComposition;
        }

        // GET: api/ProjectNationalityCompositions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectNationalityComposition([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectNationalityComposition =
                await _context.ProjectNationalityComposition.SingleOrDefaultAsync(m =>
                    m.ProjectNationalityCompositionId == id);

            if (projectNationalityComposition == null) return NotFound();

            return Ok(projectNationalityComposition);
        }

        [HttpGet("ByProject/{id}")]
        public async Task<IActionResult> GetByProjectID([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectNationalityComposition =
                await _context.ProjectNationalityComposition.Where(m => m.ProjectId == id).ToListAsync();

            if (projectNationalityComposition == null) return NotFound();

            return Ok(projectNationalityComposition);
        }

        // PUT: api/ProjectNationalityCompositions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectNationalityComposition([FromRoute] int id,
            [FromBody] ProjectNationalityComposition projectNationalityComposition)
        {
            //if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}

            var editedComposition = projectNationalityComposition;
            editedComposition.CreatedUserId = 1;
            editedComposition.IsActual = true;
            editedComposition.IsActive = true;
            editedComposition.ProjectNationalityCompositionId = id;

            _context.Entry(editedComposition).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetProjectNationalityComposition", editedComposition);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectNationalityCompositionExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/ProjectNationalityCompositions
        [HttpPost]
        public async Task<IActionResult> PostProjectNationalityComposition(
            [FromBody] ProjectNationalityComposition projectNationalityComposition)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var editedComposition = projectNationalityComposition;
            editedComposition.CreatedUserId = 1;
            editedComposition.IsActual = false;
            var workFlowId = editedComposition.workFlowId;
            if (workFlowId.HasValue)
            {
                editedComposition.IsActual = true;
                var serviceWorkflow = _context.ServiceWorkflow.First(s => s.ServiceWorkflowId == workFlowId);
                serviceWorkflow.NextStepId = 12;
                _context.Entry(serviceWorkflow).State = EntityState.Modified;
            }

            _context.ProjectNationalityComposition.Add(editedComposition);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectNationalityComposition", projectNationalityComposition);
        }

        // DELETE: api/ProjectNationalityCompositions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectNationalityComposition([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectNationalityComposition =
                await _context.ProjectNationalityComposition.SingleOrDefaultAsync(m =>
                    m.ProjectNationalityCompositionId == id);
            if (projectNationalityComposition == null) return NotFound();

            _context.ProjectNationalityComposition.Remove(projectNationalityComposition);
            await _context.SaveChangesAsync();

            return Ok(projectNationalityComposition);
        }

        private bool ProjectNationalityCompositionExists(int id)
        {
            return _context.ProjectNationalityComposition.Any(e => e.ProjectNationalityCompositionId == id);
        }
    }
}