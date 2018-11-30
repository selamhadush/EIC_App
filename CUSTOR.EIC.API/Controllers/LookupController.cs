using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EIC.Investment.API.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    public class LookupController : Controller
    {
        private ApplicationDbContext context;
        private LookupRepository _lookupRepo;

        public LookupController(ApplicationDbContext ctx, LookupRepository lookupRepo)
        {
            context = ctx;
            _lookupRepo = lookupRepo;
        }

        [HttpGet]
        [Route("api/Lookups")]
        public async Task<IEnumerable<Lookup>> GetLookups()
        {
            return await _lookupRepo.GetAllLookups();
        }

        [HttpGet]
        [Route("api/Lookups/{lang}")]
        public async Task<IEnumerable<LookupViewModel>> GetLookupsByLang(string lang)
        {
            return await _lookupRepo.GetAllLookupsByLang(lang);
        }
        [HttpGet]
        [Route("api/Lookup")]
        public IEnumerable<LookupsModel> GetLookups(int page = -1, int pageSize = 10)
        {
            return _lookupRepo.GetLookups(page, pageSize);
        }
        [HttpGet("api/lookup/ByParentIdandByCode/{id:int}/{id1:int}/{id2:int}")]
        public async Task<ICollection<Lookups>> GetLookupByParentdandByCode(int id, int id1, int id2)
        {
            return await _lookupRepo.GetRecordByParentandByCode(id, id1, id2);
        }
        [HttpGet("api/lookup/ById/{id:int}")]
        public async Task<Lookups> GetLookup(int id)
        {
            return await _lookupRepo.GetRecord(id);
        }
        [HttpGet("api/lookup/ByParentId/{id:int}")]
        public async Task<ICollection<Lookups>> GetLookupByParentId(int id)
        {
            return await _lookupRepo.GetRecordByParent(id);
        }

        [HttpPost("api/lookup")]
        public async Task<Lookups> SaveLookups([FromBody] Lookups PostedLookups)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);
            //if (!_lookupRepo.Validate(PostedLookups))
            //    throw new ApiException(_lookupRepo.ErrorMessage, 500, _lookupRepo.ValidationErrors);

            if (!await _lookupRepo.SaveAsync(PostedLookups))
                throw new ApiException(_lookupRepo.ErrorMessage);
            return PostedLookups;
        }

        [HttpDelete("api/lookup/{id:int}")]
        public async Task<bool> DeleteLookups(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in first", 401);

            return await _lookupRepo.DeleteLookup(id);
        }
    }
}