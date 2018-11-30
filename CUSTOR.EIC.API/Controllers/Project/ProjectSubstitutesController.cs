using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.API.Controllers.Project
{
    [Produces("application/json")]
    [Route("api/ProjectSubstitutes")]
    public class ProjectSubstitutesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProjectSubstitutesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ProjectSubstitutes
        [HttpGet]
        public IEnumerable<ProjectSubstitute> GetProjectSubstitute()
        {
            return _context.ProjectSubstitute;
        }

        // GET: api/ProjectSubstitutes/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectSubstitute([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectSubstitute =
                await _context.ProjectSubstitute.SingleOrDefaultAsync(m => m.ProjectSubstituteId == id);

            if (projectSubstitute == null) return NotFound();

            return Ok(projectSubstitute);
        }

        // PUT: api/ProjectSubstitutes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectSubstitute([FromRoute] int id,
            [FromBody] ProjectSubstitute projectSubstitute)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (id != projectSubstitute.ProjectSubstituteId) return BadRequest();

            _context.Entry(projectSubstitute).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectSubstituteExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/ProjectSubstitutes
        [HttpPost]
        public async Task<IActionResult> PostProjectSubstitute([FromBody] ProjectSubstitute projectSubstitute)
        {
            //if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}
            var postProjectSubstitute = projectSubstitute;
            postProjectSubstitute.CreatedUserId = 1;
            postProjectSubstitute.IsActive = false;

            var serviceApplication = new ServiceApplication();

            serviceApplication.InvestorId = projectSubstitute.InvestorId;
            serviceApplication.ProjectId = projectSubstitute.ProjectId;
            serviceApplication.CaseNumber = "1";
            serviceApplication.ServiceId = projectSubstitute.ServiceId;
            serviceApplication.CurrentStatusId = 44446;
            serviceApplication.IsSelfService = true;
            serviceApplication.IsPaid = true;
            serviceApplication.StartDate = DateTime.Now;
            serviceApplication.CreatedUserId = 1;
            serviceApplication.IsActive = false;

            var serviceWorkflow = new ServiceWorkflow
            {
                StepId = 9,
                ActionId = 3,
                FromStatusId = 3,
                ToStatusId = 5,
                PerformedByRoleId = 1,
                NextStepId = 1015,
                GenerateEmail = true,
                GenerateLetter = true,
                IsDocumentRequired = true,
                ServiceId = projectSubstitute.ServiceId,
                LegalStatusId = 3,
                CreatedUserId = 1,
                IsActive = false
            };

            serviceApplication.ServiceWorkflow.Add(serviceWorkflow);
            _context.ServiceApplication.Add(serviceApplication);
            await _context.SaveChangesAsync();
            postProjectSubstitute.ServiceApplicationId = serviceApplication.ServiceApplicationId;

            _context.ProjectSubstitute.Add(postProjectSubstitute);

            //ServiceApplication.Add(serviceApplication);
            //postProjectSubstitute.ServiceApplication = serviceApplication;
            //_context.Project.Add(editedProject);

            //_context.ProjectSubstitute.Add(postProjectSubstitute);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectSubstitute", new {id = postProjectSubstitute.ProjectSubstituteId},
                postProjectSubstitute);
        }

        // DELETE: api/ProjectSubstitutes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectSubstitute([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectSubstitute =
                await _context.ProjectSubstitute.SingleOrDefaultAsync(m => m.ProjectSubstituteId == id);
            if (projectSubstitute == null) return NotFound();

            _context.ProjectSubstitute.Remove(projectSubstitute);
            await _context.SaveChangesAsync();

            return Ok(projectSubstitute);
        }

        private bool ProjectSubstituteExists(int id)
        {
            return _context.ProjectSubstitute.Any(e => e.ProjectSubstituteId == id);
        }
    }
}