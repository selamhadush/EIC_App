using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.API.Controllers.Project
{
    [Produces("application/json")]
    [Route("api/ProjectAssociates")]
    public class ProjectAssociatesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProjectAssociatesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ProjectAssociates
        [HttpGet]
        public IEnumerable<ProjectAssociate> GetProjectAssociate()
        {
            return _context.ProjectAssociate;
        }

        // GET: api/ProjectAssociates/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectAssociate([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectAssociate =
                await _context.ProjectAssociate.SingleOrDefaultAsync(m => m.ProjectAssociateId == id);

            if (projectAssociate == null) return NotFound();

            return Ok(projectAssociate);
        }

        [HttpGet("ByProject/{id}")]
        public async Task<IActionResult> GetByProjectID([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectAssociate = await _context.ProjectAssociate.Include(p => p.Associate)
                .Where(m => m.ProjectId == id).ToListAsync();

            if (projectAssociate == null) return NotFound();

            return Ok(projectAssociate);
        }

        // PUT: api/ProjectAssociates/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectAssociate([FromRoute] int id,
            [FromBody] ProjectAssociate projectAssociate)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (id != projectAssociate.ProjectAssociateId) return BadRequest();

            _context.Entry(projectAssociate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectAssociateExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/ProjectAssociates
        [HttpPost]
        public async Task<IActionResult> PostProjectAssociate([FromBody] ProjectAssociate projectAssociate)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.ProjectAssociate.Add(projectAssociate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectAssociate", new {id = projectAssociate.ProjectAssociateId},
                projectAssociate);
        }

        // DELETE: api/ProjectAssociates/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectAssociate([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectAssociate =
                await _context.ProjectAssociate.SingleOrDefaultAsync(m => m.ProjectAssociateId == id);
            if (projectAssociate == null) return NotFound();

            _context.ProjectAssociate.Remove(projectAssociate);
            await _context.SaveChangesAsync();

            return Ok(projectAssociate);
        }

        private bool ProjectAssociateExists(int id)
        {
            return _context.ProjectAssociate.Any(e => e.ProjectAssociateId == id);
        }
    }
}