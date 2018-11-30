using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace EICOnline.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    public class ServicesController : Controller
    {
        private readonly ServicesRepository _ServicesRepo;
        private ApplicationDbContext context;

        public ServicesController(ApplicationDbContext ctx, ServicesRepository ServicesRepo)
        {
            context = ctx;
            _ServicesRepo = ServicesRepo;
        }

        [HttpGet]
        [Route("api/throw")]
        public object Throw()
        {
            throw new InvalidOperationException("This is an unhandled exception");
        }

        [HttpGet]
        [Route("api/services/{lang}")]
        public async Task<IEnumerable<Service>> GetServices()
        {
            return await _ServicesRepo.GetServices();
        }

        [HttpGet]
        [Route("api/incentiveServices/{lang}")]
        public async Task<IEnumerable<Service>> GetIncentiveServices()
        {
            return await _ServicesRepo.GetIncentiveServices();
        }

        [HttpGet]
        [Route("api/services")]
        public async Task<IEnumerable<Service>> GetServices(int page = -1, int pageSize = 10)
        {
            return await _ServicesRepo.GetServices(page, pageSize);
        }

        [HttpGet]
        [Route("api/services2")]
        public async Task<IEnumerable<Service>> GetServices2()
        {
            try
            {
                return await _ServicesRepo.GetServices2();
            }
            catch (Exception ex)
            {
                var s = ex.Message;
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("api/service/{id:int}")]
        public async Task<Service> GetService(int id)
        {
            return await _ServicesRepo.GetRecord(id);
        }

        [HttpPost("api/service")]
        public async Task<Service> SaveServices([FromBody] Service PostedServices)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);
            //if (!_ServicesRepo.Validate(PostedServices))
            //    throw new ApiException(_ServicesRepo.ErrorMessage, 500, _ServicesRepo.ValidationErrors);

            if (!await _ServicesRepo.SaveAsync(PostedServices))
                throw new ApiException(_ServicesRepo.ErrorMessage);
            return PostedServices;
        }

        [HttpDelete("api/service/{id:int}")]
        public async Task<bool> DeleteServices(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in first", 401);

            return await _ServicesRepo.DeleteService(id);
        }
    }
}