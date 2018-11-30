using System.Collections.Generic;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CUSTOR.EICOnline.API.Controllers
{
    [Produces("application/json")]
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    //[Route("api/LookupType")]
    public class LookupTypeController : Controller
    {
        private readonly LookupTypeRepository _lookupTypeRepo;
        private ApplicationDbContext context;

        public LookupTypeController(ApplicationDbContext ctx, LookupTypeRepository lookupTypeRepo)
        {
            context = ctx;
            _lookupTypeRepo = lookupTypeRepo;
        }

        //[HttpGet]
        //[Route("api/LookupType")]
        //public async Task<IEnumerable<LookupType>> GetLookups()
        //{
        //    return await _lookupTypeRepo.GetAllLookupTypes();
        //}

        [HttpGet]
        [Route("api/LookupTypes/{lang}")]
        public async Task<IEnumerable<LookupType>> GetLookupsByLang(string lang)
        {
            return await _lookupTypeRepo.GetAllLookupsByLang(lang);
        }

        [HttpGet]
        [Route("api/incentivecategorylookup/{lang}")]
        public async Task<IEnumerable<LookupType>> GetLookupsCategoryByLang(string lang)
        {
            return await _lookupTypeRepo.GetLookupsIncentiveCategoryByLang(lang);
        }

        [HttpGet]
        [Route("api/lookuptype")]
        public async Task<IEnumerable<LookupType>> GetServices(int page = -1, int pageSize = 10)
        {
            return await _lookupTypeRepo.GetLookups(page, pageSize);
        }

        [HttpGet("api/lookuptype/ById/{id:int}")]
        public async Task<LookupType> GetLookup(int id)
        {
            return await _lookupTypeRepo.GetRecord(id);
        }

        [HttpPost("api/lookuptype")]
        public async Task<LookupType> SaveLookups([FromBody] LookupType PostedLookups)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);
            //if (!lookupTypeRepo.Validate(PostedLookups))
            //    throw new ApiException(lookupTypeRepo.ErrorMessage, 500, lookupTypeRepo.ValidationErrors);

            if (!await _lookupTypeRepo.SaveAsync(PostedLookups))
                throw new ApiException(_lookupTypeRepo.ErrorMessage);
            return PostedLookups;
        }

        [HttpDelete("api/lookuptype/{id:int}")]
        public async Task<bool> DeleteLookups(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in first", 401);

            return await _lookupTypeRepo.DeleteLookup(id);
        }
    }
}