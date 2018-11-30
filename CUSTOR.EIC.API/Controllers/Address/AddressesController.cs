using System;
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
    [Route("api/Addresses")]
    public class AddressesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AddressesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Addresses
        [HttpGet]
        public IEnumerable<Address> GetAddress()
        {
            return _context.Address;
        }

        // GET: api/Addresses/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAddress([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var address = await _context.Address
                .Include(a => a.Kebele)
                .Include(a => a.Woreda)
                .Include(a => a.Zone)
                .Include(a => a.Region)
                .FirstAsync(m => m.ParentId == id);

            if (address == null) return NotFound();

            return Ok(address);
        }

        // PUT: api/Addresses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAddress([FromRoute] int id, [FromBody] Address address)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var editedAddress = address;
            editedAddress.AddressId = id;
            editedAddress.IsActive = true;
            editedAddress.IsDeleted = false;
            editedAddress.EventDatetime = DateTime.Now;
            editedAddress.CreatedUserId = 1;
            editedAddress.SpecificAreaName = "1";

            if (id != address.AddressId) return BadRequest();

            _context.Entry(editedAddress).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddressExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/Addresses
        [HttpPost]
        public async Task<IActionResult> PostAddress([FromBody] Address address)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.Address.Add(address);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAddress", new {id = address.AddressId}, address);
        }

        // DELETE: api/Addresses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddress([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var address = await _context.Address.SingleOrDefaultAsync(m => m.AddressId == id);
            if (address == null) return NotFound();

            _context.Address.Remove(address);
            await _context.SaveChangesAsync();

            return Ok(address);
        }

        private bool AddressExists(int id)
        {
            return _context.Address.Any(e => e.AddressId == id);
        }
    }
}