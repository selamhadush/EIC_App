using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace EIC.Investment.API.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    //[Route("api/Sites")]
    public class SitesController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly SiteRepository _SiteRepo;

        public SitesController(ApplicationDbContext context, SiteRepository SiteRepo)
        {
            _context = context;
            _SiteRepo = SiteRepo;
        }

        // GET: api/Sites
        [HttpGet]
        [Route("api/throw")]
        public object Throw()
        {
            throw new InvalidOperationException("This is an unhandled exception");
        }

        [HttpGet]
        [Route("api/sites")]
        public async Task<IEnumerable<Site>> GetSite(int page = -1, int pageSize = 10)
        {
            return await _SiteRepo.GetSites(page, pageSize);
        }

        [HttpGet("api/site/{id:int}")]
        public Site GetSite(int id)
        {
            return _SiteRepo.GetSite(id);
        }

        [HttpPost("api/site")]
        public async Task<Site> SaveSite([FromBody] Site PostedSite)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);
            //if (!_SiteRepo.Validate(PostedSite))
            //    throw new ApiException(_SiteRepo.ErrorMessage, 500, _SiteRepo.ValidationErrors);
            if (!await _SiteRepo.SaveAsync(PostedSite))
                throw new ApiException(_SiteRepo.ErrorMessage);
            return PostedSite;
        }

        [HttpDelete("api/site/{id:int}")]
        public async Task<bool> DeleteSite(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in first", 401);

            return await _SiteRepo.DeleteSite(id);
        }
    }
}