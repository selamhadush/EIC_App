using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL;
using CUSTOR.EICOnline.DAL.EntityLayer;
using EIC.Investment.API.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace EIC.Investment.API.Controllers.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    public class ServicePrerequisiteController : Controller
    {
        private ApplicationDbContext context;
        private readonly ServicePrerequisiteRepository ServicePrerequisiteRepo;

        public ServicePrerequisiteController(ApplicationDbContext ctx,
            ServicePrerequisiteRepository servicePrerequisiteRepo)
        {
            context = ctx;
            ServicePrerequisiteRepo = servicePrerequisiteRepo;
        }

        [HttpGet]
        [Route("api/throw")]
        public object Throw()
        {
            throw new InvalidOperationException("This is an unhandled exception");
        }

        [HttpGet]
        [Route("api/serviceprerequisites")]
        public IEnumerable<ServicePrerequisiteVM> GetServicePrerequisites(int page = -1, int pageSize = 10)
        {
            return ServicePrerequisiteRepo.GetAllServicePrerequisites(page, pageSize);
        }

        [HttpGet("api/servicePrerequisite/{id:int}")]
        public async Task<ServicePrerequisite> GetServicePrerequisite(int id)
        {
            return await ServicePrerequisiteRepo.GetRecord(id);
        }

        [HttpGet("api/servicePrerequisiteByServiceId/{SectorId:int}")]
        public async Task<List<ServicePrerequisite>> GetServicePrerequisiteBySectorId(int SectorId)
        {
            return await ServicePrerequisiteRepo.GetAllServicePrerequisitesBySectorId(SectorId);
        }

        [HttpGet("api/servicePrerequisite/{descEng}/{serviceId:int}")]
        public async Task<ServicePrerequisite> GetServicePrerequisite(string descEng, int serviceId)
        {
            return await ServicePrerequisiteRepo.GetRecord(descEng, serviceId);
        }

        [HttpPost("api/serviceprerequisite")]
        public async Task<ServicePrerequisite> SaveServicePrerequisite(
            [FromBody] ServicePrerequisite postedServicePrerequisite)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);
            //if (!ServicePrerequisiteRepo.Validate(postedServicePrerequisite))
            //throw new ApiException(ServicePrerequisiteRepo.ErrorMessage, 500, ServicePrerequisiteRepo.ValidationErrors);

            if (!await ServicePrerequisiteRepo.SaveAsync(postedServicePrerequisite))
                throw new ApiException(ServicePrerequisiteRepo.ErrorMessage);
            return postedServicePrerequisite;
        }

        [HttpDelete("api/serviceprerequisite/{id:int}")]
        public async Task<bool> DeleteServicePrerequisite(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in first", 401);

            return await ServicePrerequisiteRepo.DeleteServicePrerequisite(id);
        }
    }
}