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
    public class InvestmentActivityController : Controller
    {
        private readonly InvestmentActivityRepository _InvestmentActivityRepo;
        private ApplicationDbContext context;

        public InvestmentActivityController(ApplicationDbContext ctx, InvestmentActivityRepository ActivityRepo)
        {
            context = ctx;
            _InvestmentActivityRepo = ActivityRepo;
        }

        [HttpGet]
        [Route("api/throw")]
        public object Throw()
        {
            throw new InvalidOperationException("This is an unhandled exception");
        }

        [HttpGet]
        [Route("api/invactivityslookup")]
        public async Task<IEnumerable<InvestmentActivity>> GetActivitInvestmentActivity()
        {
            return await _InvestmentActivityRepo.GetInvestmentActivitys();
        }

        [HttpGet]
        [Route("api/invactivitys")]
        public async Task<IEnumerable<InvestmentActivity>> GetAInvestmentActivity(int page = -1, int pageSize = 10)
        {
            return await _InvestmentActivityRepo.GetInvestmentActivitys(page, pageSize);
        }


        [HttpGet]
        [Route("api/taxexemptionyear/{id:int}")]
        public InvestmentActivity GetTaxexemptionyearByProjectId([FromRoute] int id)
        {
            var InvestmentActivity = _InvestmentActivityRepo.GetInvestmentActivityByProjectId(id);
            //.AsEnumerable();
            return InvestmentActivity;
        }

        [HttpGet("api/invactivity/{id:int}")]
        public InvestmentActivity GetInvestmentActivity(int id)
        {
            return _InvestmentActivityRepo.GetInvestmentActivity(id);
        }

        [HttpPost("api/invactivity")]
        public async Task<InvestmentActivity> SaveAInvestmentActivity(
            [FromBody] InvestmentActivity PostedInvestmentActivity)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);
            if (!_InvestmentActivityRepo.Validate(PostedInvestmentActivity))
                //throw new ApiException(_InvestmentActivityRepo.ErrorMessage, 500, _InvestmentActivityRepo.ValidationErrors);

                if (!await _InvestmentActivityRepo.SaveAsync(PostedInvestmentActivity))
                    throw new ApiException(_InvestmentActivityRepo.ErrorMessage);
            return PostedInvestmentActivity;
        }

        [HttpDelete("api/invactivity/{id:int}")]
        public async Task<bool> DeleteInvestmentActivity(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in first", 401);

            return await _InvestmentActivityRepo.DeleteInvestmentActivity(id);
        }
    }
}