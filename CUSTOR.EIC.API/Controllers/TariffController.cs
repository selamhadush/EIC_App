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
    public class TariffController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly TariffRepository TariffRepo;

        public TariffController(ApplicationDbContext ctx, TariffRepository tariffRepo)
        {
            context = ctx;
            TariffRepo = tariffRepo;
        }

        [HttpGet]
        [Route("api/throw")]
        public object Throw()
        {
            throw new InvalidOperationException("This is an unhandled exception");
        }

        [HttpGet]
        [Route("api/tariffs")]
        public async Task<IEnumerable<Tariff>> GetTariffs(int page = -1, int pageSize = 10)
        {
            return await TariffRepo.GetTariff(page, pageSize);
        }

        [HttpGet("api/tariff/{id:int}")]
        public async Task<Tariff> GetTariff(int? id)
        {
            return await TariffRepo.GetRecord(id);
        }

        [HttpPost("api/tariff")]
        public async Task<Tariff> saveTariff([FromBody] Tariff postedTariff)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);
            if (!TariffRepo.Validate(postedTariff))
                //throw new ApiException(TariffRepo.ErrorMessage, 500, TariffRepo.ValidationErrors);

                if (!await TariffRepo.SaveAsync(postedTariff))
                    throw new ApiException(TariffRepo.ErrorMessage);
            return postedTariff;
        }

        [HttpDelete("api/tariff/{id:int}")]
        public async Task<bool> DeleteTariff(int id)
        {
            return await TariffRepo.DeleteTariff(id);
        }

        private bool TariffExists(int? id)
        {
            return context.Tariff.Any(e => e.TariffId == id);
        }
    }
}