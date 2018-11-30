using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EIC.Investment.API.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [Route("api/ProjectInputs")]
    public class ProjectInputsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProjectInputsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ProjectInputs
        [HttpGet]
        public IEnumerable<ProjectInput> GetProjectInput()
        {
            return _context.ProjectInput;
        }

        // GET: api/ProjectInputs/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProjectInput([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectInput = await _context.ProjectInput.SingleOrDefaultAsync(m => m.ProjectInputId == id);

            if (projectInput == null) return NotFound();

            return Ok(projectInput);
        }

        // PUT: api/ProjectInputs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectInput([FromRoute] int id, [FromBody] ProjectInput projectInput)
        {
            //if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}

            //if (id != projectInput.ProjectInputId)
            //{
            //  return BadRequest();
            //}

            var project = projectInput;
            project.CreatedUserId = 1;
            project.ProjectInputId = id;
            project.IsActive = true;


            _context.Entry(project).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetProjectInput", new {id = projectInput.ProjectInputId}, project);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectInputExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpGet("ByProject/{id}")]
        public async Task<ICollection<ProjectInput>> GetInputByProjectIDAsync([FromRoute] int id)
        {
            var projectInput = await _context.ProjectInput
                .Where(m => m.ProjectId == id).ToListAsync();


            return projectInput;
        }

        // POST: api/ProjectInputs
        [HttpPost]
        public async Task<IActionResult> PostProjectInput([FromBody] ProjectInput projectInput)
        {
            //if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}

            var project = projectInput;
            project.CreatedUserId = 1;
            _context.ProjectInput.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectInput", project);
        }

        // DELETE: api/ProjectInputs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectInput([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var projectInput = await _context.ProjectInput.SingleOrDefaultAsync(m => m.ProjectInputId == id);
            if (projectInput == null) return NotFound();

            _context.ProjectInput.Remove(projectInput);
            await _context.SaveChangesAsync();

            return Ok(projectInput);
        }

        private bool ProjectInputExists(int id)
        {
            return _context.ProjectInput.Any(e => e.ProjectInputId == id);
        }
    }
}