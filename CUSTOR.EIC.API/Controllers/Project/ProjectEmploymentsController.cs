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
    [Route("api/ProjectEmployments")]
    public class ProjectEmploymentsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ProjectEmploymentRepository EmploymentRepository;

        public ProjectEmploymentsController(ApplicationDbContext context, ProjectEmploymentRepository repository)
        {
            _context = context;
            EmploymentRepository = repository;
        }

        // GET: api/ProjectEmployments
        [HttpGet]
        public IEnumerable<ProjectEmployment> GetProjectEmployment()
        {
            return _context.ProjectEmployment;
        }

        // GET: api/ProjectEmployments/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectEmployment([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectEmployment =
                await _context.ProjectEmployment.SingleOrDefaultAsync(m => m.ProjectEmploymentId == id);

            if (projectEmployment == null) return NotFound();

            return Ok(projectEmployment);
        }

        [HttpGet("ByProject/{id}")]
        public async Task<IActionResult> GetByProjectID([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectEmployment = _context.ProjectEmployment.FirstOrDefault(m => m.ProjectId == id);

            if (projectEmployment == null) return NotFound();

            return Ok(projectEmployment);
        }

        [HttpGet("ActualEmployment/{id}")]
        public async Task<IActionResult> ActualEmployment([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectEmployment = _context.ProjectEmployment.Where(m => m.IsActual && m.ProjectId == id)
                .AsEnumerable()
                .OrderByDescending(s => s.ProjectEmploymentId);


            if (projectEmployment == null) return NotFound();

            return Ok(projectEmployment);
        }

        // PUT: api/ProjectEmployments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectEmployment([FromRoute] int id,
            [FromBody] ProjectEmployment projectEmployment)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var editedProjectEmployement = projectEmployment;

            editedProjectEmployement.IsActive = false;
            editedProjectEmployement.ProjectEmploymentId = id;
            editedProjectEmployement.CreatedUserId = 1;

            //int? workFlowId = projectEmployment.workFlowId;

            //ServiceWorkflow serviceWorkflow = _context.ServiceWorkflow.First(s => s.ServiceWorkflowId == workFlowId);
            //serviceWorkflow.NextStepId = 14;
            //_context.Entry(serviceWorkflow).State = EntityState.Modified;
            if (id != projectEmployment.ProjectEmploymentId) return BadRequest();

            _context.Entry(editedProjectEmployement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectEmploymentExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/ProjectEmployments
        [HttpPost]
        public async Task<IActionResult> PostProjectEmployment([FromBody] ProjectEmployment projectEmployment)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var editedProjectEmployement = projectEmployment;

            editedProjectEmployement.IsActive = true;
            editedProjectEmployement.IsActual = true;
            editedProjectEmployement.CreatedUserId = 1;

            var workFlowId = projectEmployment.workFlowId;
            if (workFlowId.HasValue)
            {
                projectEmployment.IsActual = false;

                var serviceWorkflow = _context.ServiceWorkflow.First(s => s.ServiceWorkflowId == workFlowId);
                serviceWorkflow.NextStepId = 14;
                _context.Entry(serviceWorkflow).State = EntityState.Modified;
            }

            _context.ProjectEmployment.Add(editedProjectEmployement);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectEmployment", new {id = projectEmployment.ProjectEmploymentId},
                projectEmployment);
        }

        // DELETE: api/ProjectEmployments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectEmployment([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectEmployment =
                await _context.ProjectEmployment.SingleOrDefaultAsync(m => m.ProjectEmploymentId == id);
            if (projectEmployment == null) return NotFound();

            _context.ProjectEmployment.Remove(projectEmployment);
            await _context.SaveChangesAsync();

            return Ok(projectEmployment);
        }

        private bool ProjectEmploymentExists(int id)
        {
            return _context.ProjectEmployment.Any(e => e.ProjectEmploymentId == id);
        }
    }
}