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
    public class SubSectorController : Controller
    {
        private readonly SubSectorRepository _SubSectorRepo;
        private ApplicationDbContext context;

        public SubSectorController(ApplicationDbContext ctx, SubSectorRepository SectorRepo)
        {
            context = ctx;
            _SubSectorRepo = SectorRepo;
        }

        [HttpGet]
        [Route("api/throw")]
        public object Throw()
        {
            throw new InvalidOperationException("This is an unhandled exception");
        }

        [HttpGet]
        [Route("api/subsectorslookup")]
        public async Task<IEnumerable<SubSector>> GetSubSector()
        {
            return await _SubSectorRepo.GetSubSectors();
        }

        [HttpGet]
        [Route("api/subsectors")]
        public async Task<IEnumerable<SubSector>> GetSubSector(int page = -1, int pageSize = 10)
        {
            return await _SubSectorRepo.GetSubSectors(page, pageSize);
        }

        [HttpGet("api/subsector/{id:int}")]
        public SubSector GetSubSector(int id)
        {
            return _SubSectorRepo.GetSubSector(id);
        }

        [HttpPost("api/subsector")]
        public async Task<SubSector> SaveSubSector([FromBody] SubSector PostedSubSector)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);
            if (!_SubSectorRepo.Validate(PostedSubSector))
                //throw new ApiException(_SubSectorRepo.ErrorMessage, 500, _SubSectorRepo.ValidationErrors);

                if (!await _SubSectorRepo.SaveAsync(PostedSubSector))
                    throw new ApiException(_SubSectorRepo.ErrorMessage);
            return PostedSubSector;
        }

        [HttpDelete("api/subsector/{id:int}")]
        public async Task<bool> DeleteSubSector(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in first", 401);

            return await _SubSectorRepo.DeleteSubSector(id);
        }
    }
}