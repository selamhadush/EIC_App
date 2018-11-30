using System.Collections.Generic;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL;
using CUSTOR.EICOnline.DAL.DataAccessLayer.Address;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CUSTOR.EICOnline.API.Controllers.Address
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    public class RegionsController : Controller
    {
        private readonly RegionRepo _RegionRepo;

        public RegionsController(RegionRepo regionRepo)
        {
            _RegionRepo = regionRepo;
        }
        //[HttpGet /{Lang}]
        //public async Task<IEnumerable<RegionViewModel>> GetRegion(string Id)
        //{
        //    return await _RegionRepo.GetRegion(Id);
        //}

        [HttpGet]
        [Route("api/Regions/{Lang}")]
        public async Task<IEnumerable<RegionViewModel>> GetRegions(string lang)
        {
            return await _RegionRepo.GetRegions(lang);
        }

        [HttpGet("api/Regions/ById/{Id}")]
        public async Task<Region> GetRegionsById(string Id)
        {
            return await _RegionRepo.GetRegionsById(Id);
        }

        [HttpGet]
        [Route("api/Regions")]
        public async Task<IEnumerable<Region>> GetRegions()
        {
            return await _RegionRepo.GetRegions();
        }

        [HttpPost("api/Region")]
        public async Task<Region> saveRegion([FromBody] Region postedRegion)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);
            //if (!_RegionRepo.Validate(postedRegion))
            //throw new ApiException(_RegionRepo.ErrorMessage, 500, _RegionRepo.ValidationErrors);

            if (!await _RegionRepo.SaveAsync(postedRegion))
                throw new ApiException(_RegionRepo.ErrorMessage);
            return postedRegion;
        }

        [HttpDelete("api/Region/{id}")]
        public async Task<bool> DeleteRegion(string id)
        {
            return await _RegionRepo.DeleteRegion(id);
        }
    }
}