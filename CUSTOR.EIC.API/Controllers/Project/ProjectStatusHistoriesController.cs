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
    [Route("api/ProjectStatusHistories")]
    public class ProjectStatusHistoriesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProjectStatusHistoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ProjectStatusHistories
        [HttpGet]
        public IEnumerable<ProjectStatusHistory> GetProjectStatusHistory()
        {
            return _context.ProjectStatusHistory;
        }

        // GET: api/ProjectStatusHistories/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectStatusHistory([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectStatusHistory =
                await _context.ProjectStatusHistory.SingleOrDefaultAsync(m => m.ProjectStatusHistoryId == id);

            if (projectStatusHistory == null) return NotFound();

            return Ok(projectStatusHistory);
        }

        // PUT: api/ProjectStatusHistories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectStatusHistory([FromRoute] int id,
            [FromBody] ProjectStatusHistory projectStatusHistory)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (id != projectStatusHistory.ProjectStatusHistoryId) return BadRequest();

            _context.Entry(projectStatusHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectStatusHistoryExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/ProjectStatusHistories
        [HttpPost]
        public async Task<IActionResult> PostProjectStatusHistory([FromBody] ProjectStatusHistory projectStatusHistory)
        {
            //if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}
            var editedProjectStatusHistory = projectStatusHistory;
            editedProjectStatusHistory.CreatedUserId = 1;

            var project = _context.Project.First(s => s.ProjectId == projectStatusHistory.ProjectId);


            if (project == null)
            {
                return NotFound();
            }

            project.ProjectStatus = projectStatusHistory.ProjectStatus;
            project.ProjectStage = projectStatusHistory.ProjectStage;
            _context.Entry(project).State = EntityState.Modified;

            _context.ProjectStatusHistory.Add(editedProjectStatusHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectStatusHistory", new {id = projectStatusHistory.ProjectStatusHistoryId},
                editedProjectStatusHistory);
        }

        // DELETE: api/ProjectStatusHistories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectStatusHistory([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectStatusHistory =
                await _context.ProjectStatusHistory.SingleOrDefaultAsync(m => m.ProjectStatusHistoryId == id);
            if (projectStatusHistory == null) return NotFound();

            _context.ProjectStatusHistory.Remove(projectStatusHistory);
            await _context.SaveChangesAsync();

            return Ok(projectStatusHistory);
        }

        private bool ProjectStatusHistoryExists(int id)
        {
            return _context.ProjectStatusHistory.Any(e => e.ProjectStatusHistoryId == id);
        }
    }
}