using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL.DataAccessLayer;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Associates")]
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    public class AssociatesController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IHostingEnvironment host;
        private readonly AssociateRepository Repository;

        public AssociatesController(ApplicationDbContext context, AssociateRepository associate,
            IHostingEnvironment host)
        {
            _context = context;
            Repository = associate;
            this.host = host;
        }

        // GET: api/Associates
        [HttpGet]
        public IEnumerable<Associate> GetAssociate()
        {
            return Repository.GetAll();
        }

        [HttpGet("ByInvestorId/{id}")]
        public IEnumerable<Associate> GetAssociateByInvestorID([FromRoute] int id)
        {
            return _context.Associate
                .Where(p => p.InvestorId == id);
        }

        // GET: api/Associates/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAssociate([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var associate = await _context.Associate.FirstOrDefaultAsync(m => m.AssociateId == id);

            if (associate == null) return NotFound();

            return Ok(associate);
        }

        // PUT: api/Associates/5
        [HttpPut("{id}")]

        // POST: api/Associates
        [HttpPost]
        public async Task<Associate> PostAssociate([FromBody] AssociateDTO associateDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                    throw new ApiException("Model binding failed.", 500);
                //if (!InvestorRepo.Validate(postedInvestor))
                //    throw new ApiException(InvestorRepo.ErrorMessage, 500, InvestorRepo.ValidationErrors);

                var mgr = associateDTO.GetAssociate();
                if (!await Repository.SaveAsync(mgr))
                    throw new ApiException(Repository.ErrorMessage);

                if (!string.IsNullOrEmpty(associateDTO.PhotoData))
                {
                    // Create photo file
                    var photoPath = Path.Combine(host.WebRootPath, "Photo");
                    if (!Directory.Exists(photoPath))
                        Directory.CreateDirectory(photoPath);
                    var fileName = "Mgr" + mgr.AssociateId + ".jpg"; //put "Mgr" as constant in config file
                    var filePath = Path.Combine(photoPath, fileName);

                    using (var fs = new FileStream(filePath, FileMode.Create))
                    {
                        using (var bw = new BinaryWriter(fs))
                        {
                            var data = Convert.FromBase64String(associateDTO.PhotoData);
                            bw.Write(data);
                            bw.Close();
                        }
                    }
                }

                return mgr;
            }
            catch (Exception ex)
            {
                var s = ex.Message;
                throw new Exception(ex.Message);
            }
        }

        // DELETE: api/Associates/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssociate([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var associate = await _context.Associate.SingleOrDefaultAsync(m => m.AssociateId == id);
            if (associate == null) return NotFound();

            _context.Associate.Remove(associate);
            await _context.SaveChangesAsync();
            //Now delete the photo file
            var photoPath = Path.Combine(host.WebRootPath, "Photo");
            if (Directory.Exists(photoPath))
            {
                var fileName = "Mgr" + associate.AssociateId + ".jpg"; //put "Mgr" as constant in config file
                var filePath = Path.Combine(photoPath, fileName);
                try
                {
                    if (System.IO.File.Exists(filePath))
                        System.IO.File.Delete(filePath);
                }
                catch
                {
                }
            }

            return Ok(associate);
        }

        private bool AssociateExists(int id)
        {
            return _context.Associate.Any(e => e.AssociateId == id);
        }
    }
}