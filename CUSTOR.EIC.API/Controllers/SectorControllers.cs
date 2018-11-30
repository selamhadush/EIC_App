using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace EIC.Investment.API.Controllers.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    public class SectorController : Controller
    {
        private readonly SectorRepository _SectorRepo;
        private ApplicationDbContext context;

        public SectorController(ApplicationDbContext ctx, SectorRepository SectorRepo)
        {
            context = ctx;
            _SectorRepo = SectorRepo;
        }

        [HttpGet]
        [Route("api/throw")]
        public object Throw()
        {
            throw new InvalidOperationException("This is an unhandled exception");
        }

        [HttpGet]
        [Route("api/sectorslookup")]
        public async Task<IEnumerable<Sector>> GetSector()
        {
            return await _SectorRepo.GetSectors();
        }

        [HttpGet]
        [Route("api/sectors")]
        public async Task<IEnumerable<Sector>> GetSector(int page = -1, int pageSize = 10)
        {
            return await _SectorRepo.GetSectors(page, pageSize);
        }

        [HttpGet("api/sector/{id:int}")]
        public async Task<Sector> GetSector(int id)
        {
            return await _SectorRepo.GetRecord(id);
        }

        [HttpPost("api/sector")]
        public async Task<Sector> SaveSector([FromBody] Sector PostedSector)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);
            if (!_SectorRepo.Validate(PostedSector))
                //throw new ApiException(_SectorRepo.ErrorMessage, 500, _SectorRepo.ValidationErrors);

                if (!await _SectorRepo.SaveAsync(PostedSector))
                    throw new ApiException(_SectorRepo.ErrorMessage);
            return PostedSector;
        }

        [HttpDelete("api/sector/{id:int}")]
        public async Task<bool> DeleteSector(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in first", 401);

            return await _SectorRepo.DeleteSector(id);
        }
    }
}