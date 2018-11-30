using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.API.Controllers
{
    [Produces("application/json")]
    [Route("api/ApplicationSettings")]
    public class ApplicationSettingsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ApplicationSettingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ApplicationSettings
        [HttpGet]
        public IEnumerable<ApplicationSetting> GetApplicationSetting()
        {
            return _context.ApplicationSetting;
        }

        // GET: api/ApplicationSettings/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetApplicationSetting([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var applicationSetting =
                await _context.ApplicationSetting.SingleOrDefaultAsync(m => m.ApplicationSettingId == id);

            if (applicationSetting == null) return NotFound();

            return Ok(applicationSetting);
        }

        // PUT: api/ApplicationSettings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApplicationSetting([FromRoute] int id,
            [FromBody] ApplicationSetting applicationSetting)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (id != applicationSetting.ApplicationSettingId) return BadRequest();

            _context.Entry(applicationSetting).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApplicationSettingExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/ApplicationSettings
        [HttpPost]
        public async Task<IActionResult> PostApplicationSetting([FromBody] ApplicationSetting applicationSetting)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.ApplicationSetting.Add(applicationSetting);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetApplicationSetting", new {id = applicationSetting.ApplicationSettingId},
                applicationSetting);
        }

        // DELETE: api/ApplicationSettings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplicationSetting([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var applicationSetting =
                await _context.ApplicationSetting.SingleOrDefaultAsync(m => m.ApplicationSettingId == id);
            if (applicationSetting == null) return NotFound();

            _context.ApplicationSetting.Remove(applicationSetting);
            await _context.SaveChangesAsync();

            return Ok(applicationSetting);
        }

        private bool ApplicationSettingExists(int id)
        {
            return _context.ApplicationSetting.Any(e => e.ApplicationSettingId == id);
        }
    }
}