using System;
using System.Collections.Generic;
using System.Linq;
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
    public class ServiceTariffsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ServiceTariffRepository _serviceTariffsRepo;

        public ServiceTariffsController(ApplicationDbContext context, ServiceTariffRepository serviceTariffRepo)
        {
            _context = context;
            _serviceTariffsRepo = serviceTariffRepo;
        }

        [HttpGet]
        [Route("api/throw")]
        public object Throw()
        {
            throw new InvalidOperationException("This is an unhandled exception");
        }

        // GET: api/ServiceTariffs
        [HttpGet]
        [Route("api/servicetariffs")]
        public IEnumerable<ServiceTariffLookup> GetServiceTariffs(int page = -1, int pageSize = 10)
        {
            return _serviceTariffsRepo.GetServiceTariffs(page, pageSize);
        }

        // GET: api/ServiceTariffs/5
        [HttpGet("api/servicetariff/{id:int}")]
        public List<ServiceTariff> GetServiceTariff(int id)
        {
            return _serviceTariffsRepo.GetServiceTariff(id);
        }

        [HttpPost("api/servicetariff")]
        public async Task<ServiceTariffLookup> Saveservicetariff([FromBody] ServiceTariffLookup postedServiceTariff)
        {
            //if (!ModelState.IsValid)
            //    throw new ApiException("Model binding failed.", 500);
            //if (!_serviceTariffsRepo.Validate(postedServiceTariff))
            //    throw new ApiException(_serviceTariffsRepo.ErrorMessage, 500, _serviceTariffsRepo.ValidationErrors);

            //if (!await _serviceTariffsRepo.SaveAsync(postedServiceTariff))
            //    throw new ApiException(_serviceTariffsRepo.ErrorMessage);

            foreach (var tariff in postedServiceTariff.TariffId)
            {
                var serviceTariff = new ServiceTariff();
                serviceTariff.ServiceId = postedServiceTariff.ServiceId;
                serviceTariff.TariffId = tariff;

                await _serviceTariffsRepo.SaveAsync(serviceTariff);
            }

            return postedServiceTariff;
        }

        // DELETE: api/ServiceTariffs/5
        [HttpDelete("api/servicetariff/{id:int}")]
        public async Task<bool> DeleteServiceTariff(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in first", 401);

            return await _serviceTariffsRepo.DeleteServiceTariff(id);
        }

        private bool ServiceTariffExists(int id)
        {
            return _context.ServiceTariff.Any(e => e.ServiceTariffId == id);
        }
    }
}