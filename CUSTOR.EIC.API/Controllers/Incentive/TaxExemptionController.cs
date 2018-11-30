using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL.DataAccessLayer;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CUSTOR.EICOnline.API.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    public class TaxExemptionController : Controller
    {
        private readonly TaxExemptionRepository _TaxExemptionRepoo;

        private ApplicationDbContext context;

        public TaxExemptionController(ApplicationDbContext ctx, TaxExemptionRepository TaxExemptionRepo)
        {
            context = ctx;
            _TaxExemptionRepoo = TaxExemptionRepo;
        }

        [HttpGet]
        [Route("api/throw")]
        public object Throw()
        {
            throw new InvalidOperationException("This is an unhandled exception");
        }


        [HttpGet]
        [Route("api/taxexemptions/{id:int}")]
        public async Task<IEnumerable<IncentiveTaxExemptionRequest>> GetTaxExemptions(int id, int page = -1,
            int pageSize = 10)
        {
            return await _TaxExemptionRepoo.GetTaxExemptions(id, page, pageSize);
        }


        //[HttpGet]
        //[Route("api/taxExemptions/ByProjectId/{id:int}")]
        //public IEnumerable< TaxExemptionLookup> GetTaxExemptions(int id, int page = -1, int pageSize = 10)
        //{
        //    return _TaxExemptionRepoo.GetTaxExemptions(id, page, pageSize);
        //}

        [HttpGet("api/taxexemption/{id:int}")]
        public IncentiveTaxExemptionRequest GetTaxExemption(int id)
        {
            return _TaxExemptionRepoo.GetTaxExemption(id);
        }

        [HttpPost("api/taxexemption")]
        public async Task<IncentiveTaxExemptionRequest> SaveTaxExemption(
            [FromBody] IncentiveTaxExemptionRequest PostedGetTaxExemption)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);
            //if (!_TaxExemptionRepoo.Validate(PostedGetTaxExemption))
            //throw new ApiException(_TaxExemptionRepoo.ErrorMessage, 500, _TaxExemptionRepoo.ValidationErrors);

            if (!await _TaxExemptionRepoo.SaveAsync(PostedGetTaxExemption))
                throw new ApiException(_TaxExemptionRepoo.ErrorMessage);
            return PostedGetTaxExemption;
        }

        [HttpDelete("api/taxexemption/{id:int}")]
        public async Task<bool> DeleteTaxExemption(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in first", 401);

            return await _TaxExemptionRepoo.DeleteTaxExemption(id);
        }
    }
}