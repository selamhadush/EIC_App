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
    [Route("api/ProjectOutputs")]
    public class ProjectOutputsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ProjectOuputRepository _Repository;

        public ProjectOutputsController(ApplicationDbContext context, ProjectOuputRepository repository)
        {
            _context = context;
            _Repository = repository;
        }

        // GET: api/ProjectOutputs
        [HttpGet]
        public IEnumerable<ProjectOutput> GetProjectOutput()
        {
            return _Repository.GetAll();
        }

        // GET: api/ProjectOutputs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectOutput([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectOutput = await _context.ProjectOutput.SingleOrDefaultAsync(m => m.ProjectOutputId == id);

            if (projectOutput == null) return NotFound();

            return Ok(projectOutput);
        }

        [HttpGet("ByProject/{id}")]
        public ICollection<ProjectOutput> GetProjectOutputByProjectID([FromRoute] int id)
        {
            var ProjectOutput = _Repository.GetOutPutByProjectId(id);

            return ProjectOutput;
        }

        [HttpGet("ActualProduct/{id}")]
        public async Task<IActionResult> GetProjectActualProduct([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectEmployment = _context.ProjectOutput.Where(m => m.IsActual && m.ProjectId == id).AsEnumerable()
                .OrderByDescending(s => s.ProjectOutputId);


            if (projectEmployment == null) return NotFound();

            return Ok(projectEmployment);
        }

        // PUT: api/ProjectOutputs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectOutput([FromRoute] int id, [FromBody] ProjectOutput projectOutput)
        {
            //if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}

            //if (id != projectOutput.ProjectOutputId)
            //{
            //  return BadRequest();
            //}

            var output = projectOutput;
            output.CreatedUserId = 1;
            output.IsActual = false;
            output.IsActive = true;
            output.ProjectOutputId = id;

            var projectId = projectOutput.ProjectId;
            var project = _context.Project.First(p => p.ProjectId == projectId);
            project.IsActive = true;
            _context.Entry(project).State = EntityState.Modified;

            _context.Entry(output).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetProjectOutput", output);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectOutputExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/ProjectOutputs
        [HttpPost]
        public async Task<IActionResult> PostProjectOutput([FromBody] ProjectOutput projectOutput)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var editedProjectOutput = projectOutput;
            editedProjectOutput.CreatedUserId = 1;
            editedProjectOutput.IsActual = true;
            editedProjectOutput.Remark = "remark";

            var workFlowId = projectOutput.workFlowId;

            if (workFlowId.HasValue)
            {
                projectOutput.IsActual = false;

                var serviceWorkflow = _context.ServiceWorkflow.First(s => s.ServiceWorkflowId == workFlowId);
                serviceWorkflow.NextStepId = 18;
                _context.Entry(serviceWorkflow).State = EntityState.Modified;
            }

            var projectId = projectOutput.ProjectId;
            var project = _context.Project.First(p => p.ProjectId == projectId);
            //project.IsActive = true;
            _context.Entry(project).State = EntityState.Modified;

            _context.ProjectOutput.Add(editedProjectOutput);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectOutput", projectOutput);
            //ProjectOutput output = projectOutput;
            //output.CreatedUserId = 1;
            //output.IsActual = true;

            //int projectId = projectOutput.ProjectId;
            //Project project = _context.Project.First(p => p.ProjectId == projectId);
            //project.IsActive = true;
            //_context.Entry(project).State = EntityState.Modified;

            //_context.ProjectOutput.Add(output);
            //await _context.SaveChangesAsync();

            //return CreatedAtAction("GetProjectOutput", new { id = projectOutput.ProjectOutputId }, projectOutput);
        }

        // DELETE: api/ProjectOutputs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectOutput([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectOutput = await _context.ProjectOutput.SingleOrDefaultAsync(m => m.ProjectOutputId == id);
            if (projectOutput == null) return NotFound();

            _context.ProjectOutput.Remove(projectOutput);
            await _context.SaveChangesAsync();

            return Ok(projectOutput);
        }

        private bool ProjectOutputExists(int id)
        {
            return _context.ProjectOutput.Any(e => e.ProjectOutputId == id);
        }
    }
}