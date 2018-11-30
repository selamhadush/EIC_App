using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL;
using CUSTOR.EICOnline.DAL.DataAccessLayer.dto;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace EICOnline.Controllers
{
    //[Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    public class InvestorController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly InvestorRepository InvestorRepo;

        public InvestorController(ApplicationDbContext ctx, InvestorRepository investorRepo)
        {
            context = ctx;
            InvestorRepo = investorRepo;
        }

        [HttpGet]
        [Route("api/throw")]
        public object Throw()
        {
            throw new InvalidOperationException("This is an unhandled exception");
        }

        [HttpGet]
        [Route("api/investors")]
        //[Authorize(Authorization.Policies.ViewAllInvestorsPolicy)]
        public async Task<IEnumerable<Investor>> GetInvestors(int page = -1, int pageSize = 10)
        {
            //throw new ApiException("Model binding failed.");
            return await InvestorRepo.GetAllInvestors(page, pageSize);
        }

        [HttpGet("api/investor/{id:int}")]
        public async Task<Investor> GetInvestor(int id)
        {
            return await InvestorRepo.GetRecord(id);
        }

        [HttpGet("api/InvestorByUserId/{id}")]
        public async Task<IEnumerable<Investor>> GetInvestorByUserId(string id)
        {
            return await InvestorRepo.GetRecordByUserId(id);
        }


        [HttpGet("api/InvestorByTIN/{id}")]
        public async Task<IEnumerable<Investor>> GetInvestorByTIN(string id)
        {
            return await InvestorRepo.GetRecordByTIN(id);
        }

        [HttpPost("api/SearchInvestor")]
        public async Task<IEnumerable<Investor>> GetSearchedInvestor([FromBody] SearchInvestorDto searchInvestorDto)
        {
            return await InvestorRepo.FindInvestor(searchInvestorDto);
        }

        [HttpPost("api/investor")]
        public async Task<ServiceApplication> SaveInvestor([FromBody] Investor postedInvestor)
        {
            try
            {
                if (!ModelState.IsValid)
                    throw new ApiException("Model binding failed.", 500);

                context.Investors.Add(postedInvestor);
                await context.SaveChangesAsync();
                var serviceApplication = new ServiceApplication
                {
                    InvestorId = postedInvestor.InvestorId,
                    CaseNumber = "12",
                    ServiceId = 1235,
                    CurrentStatusId = 44450,
                    IsSelfService = true,
                    IsPaid = true,
                    StartDate = DateTime.Now,
                    CreatedUserId = 1,
                    IsActive = false,
                    CreatedUserName = "Investor",
                    InvestorNameAmharic = postedInvestor.FirstNameEng + postedInvestor.FirstNameEng +
                                          postedInvestor.FirstNameEng,
                    InvestorNameEnglish = postedInvestor.FirstNameEng + postedInvestor.FirstNameEng +
                                          postedInvestor.FirstNameEng,
                    ServiceNameAmharic = "Customer Registration",
                    ServiceNameEnglish = "Customer Registration",
                    ProjectNameEnglish = "",
                    ProjectNameAmharic = ""
                };

                context.ServiceApplication.Add(serviceApplication);
                await context.SaveChangesAsync();
                return serviceApplication;
            }
            catch (Exception ex)
            {
                var s = ex.Message;
                throw new Exception(ex.Message);
            }
        }

        [HttpDelete("api/investor/{id:int}")]
        public async Task<bool> DeleteInvestor(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in first", 401);

            return await InvestorRepo.DeleteInvestor(id);
        }
    }
}