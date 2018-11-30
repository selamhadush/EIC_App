using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.API.Controllers.Project
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [Route("api/ProjectCancellations")]
    public class ProjectCancellationsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProjectCancellationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // DELETE: api/ProjectCancellations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectCancellation([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectCancellation =
                await _context.ProjectCancellation.SingleOrDefaultAsync(m => m.ProjectCancellationId == id);
            if (projectCancellation == null) return NotFound();

            _context.ProjectCancellation.Remove(projectCancellation);
            await _context.SaveChangesAsync();

            return Ok(projectCancellation);
        }

        // GET: api/ProjectCancellations
        [HttpGet]
        public IEnumerable<ProjectCancellation> GetProjectCancellation()
        {
            return _context.ProjectCancellation;
        }

        // GET: api/ProjectCancellations/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectCancellation([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectCancellation =
                await _context.ProjectCancellation.SingleOrDefaultAsync(m => m.ProjectCancellationId == id);

            if (projectCancellation == null) return NotFound();

            return Ok(projectCancellation);
        }

        // POST: api/ProjectCancellations
        [HttpPost]
        public async Task<IActionResult> PostProjectCancellation([FromBody] ProjectCancellation projectCancellation)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}
            var postProjectCancellation = projectCancellation;
            postProjectCancellation.CreatedUserId = 1;
            postProjectCancellation.ApprovedBy = 1;
            postProjectCancellation.CancellationType = 12;

            var serviceApplication = new ServiceApplication();

            serviceApplication.InvestorId = postProjectCancellation.InvestorId;
            serviceApplication.ProjectId = postProjectCancellation.ProjectId;
            serviceApplication.CaseNumber = "1";
            serviceApplication.ServiceId = postProjectCancellation.ServiceId;
            serviceApplication.CurrentStatusId = 44446;
            serviceApplication.IsSelfService = true;
            serviceApplication.IsPaid = true;
            serviceApplication.StartDate = DateTime.Now;
            serviceApplication.CreatedUserId = 1;
            serviceApplication.IsActive = false;

            //ServiceApplication.Add(serviceApplication);
            _context.ServiceApplication.Add(serviceApplication);
            await _context.SaveChangesAsync();
            postProjectCancellation.ServiceApplicationId = serviceApplication.ServiceApplicationId;

            _context.ProjectCancellation.Add(postProjectCancellation);

            //ServiceApplication.Add(serviceApplication);
            postProjectCancellation.ServiceApplication = serviceApplication;
            //_context.Project.Add(editedProject);

            _context.ProjectCancellation.Add(postProjectCancellation);
            int? ProjectId = projectCancellation.ProjectId;


            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectCancellation", new {id = postProjectCancellation.ProjectCancellationId},
                postProjectCancellation);
        }

        // PUT: api/ProjectCancellations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectCancellation([FromRoute] int id,
            [FromBody] ProjectCancellation projectCancellation)
        {
            //if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}

            //if (id != projectCancellation.ProjectCancellationId)
            //{

            //  return BadRequest();
            //}
            var project = _context.Project.First(s => s.ProjectId == projectCancellation.ProjectId);
            project.ProjectStatus = 4;
            _context.Entry(project).State = EntityState.Modified;
            //_context.Entry(projectCancellation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectCancellationExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        private bool ProjectCancellationExists(int id)
        {
            return _context.ProjectCancellation.Any(e => e.ProjectCancellationId == id);
        }
    }
}