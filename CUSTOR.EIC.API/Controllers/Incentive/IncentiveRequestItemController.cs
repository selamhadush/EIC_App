using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EICOnline.DAL.EntityLayer.Incentive;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CUSTOR.EICOnline.API.Controllers.Incentive
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    public class IncentiveRequestItemController : Controller
    {
        private readonly IncentiveRequestItemRepository _IncentiveRequestItemRepoo;

        private ApplicationDbContext context;

        //, IncentiveRequestItemRepository IncentiveRequestItemRepo
        public IncentiveRequestItemController(ApplicationDbContext ctx,
            IncentiveRequestItemRepository IncentiveRequestItemRepo)
        {
            context = ctx;
            _IncentiveRequestItemRepoo = IncentiveRequestItemRepo;
        }

        [HttpGet]
        [Route("api/throw")]
        public object Throw()
        {
            throw new InvalidOperationException("This is an unhandled exception");
        }

        //[HttpGet]
        //[Route("api/incentiveRequestItemlookup")]
        //public async Task<IEnumerable<IncentiveRequestItem>> GetIncentiveRequestItem()
        //{
        //    return await _IncentiveRequestItemRepoo.GetIncentiveRequestItem();
        //}

        [HttpGet]
        [Route("api/incentiveRequestItems/ByProjectId/{id:int}")]
        public async Task<IEnumerable<IncentiveRequestItem>> GetIncentiveRequestItems(int id, int page = -1,
            int pageSize = 10)
        {
            return await _IncentiveRequestItemRepoo.GetIncentiveRequestItems(id, page, pageSize);
        }


        //[HttpGet]
        //[Route("api/incentiveRequestItems/ByProjectId/{id:int}")]
        //public IEnumerable<Incentive_RequestItemLookup> GetIncentiveRequestItems(int id, int page = -1, int pageSize = 10)
        //{
        //    return _IncentiveRequestItemRepoo.GetIncentiveRequestItems(id, page, pageSize);
        //}

        //[HttpGet("api/incentiveRequestItem/{id:int}")]
        //public Incentive_RequestItem GetIncentiveRequestItem(int id)
        //{
        //    return _IncentiveRequestItemRepoo.GetIncentiveRequestItem(id);
        //}

        [HttpPost("api/incentiveRequestItem")]
        public async Task<IncentiveRequestItem> SaveIncentiveRequestItem(
            [FromBody] IncentiveRequestItem PostedGetIncentiveRequestItem)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);
            //if (!_IncentiveRequestItemRepoo.Validate(PostedGetIncentiveRequestItem))
            //throw new ApiException(_IncentiveRequestItemRepoo.ErrorMessage, 500, _IncentiveRequestItemRepoo.ValidationErrors);
            //SaveIncentiveItem();
            if (!await _IncentiveRequestItemRepoo.SaveAsync(PostedGetIncentiveRequestItem))
                throw new ApiException(_IncentiveRequestItemRepoo.ErrorMessage);

            return PostedGetIncentiveRequestItem;
        }
        //private void SaveIncentiveItem()
        //{
        //  IncentiveRequest incentiveRequest = new IncentiveRequest();

        //  incentiveRequest.ServiceApplicationId = 10;
        //  incentiveRequest.ProjectId = 16107;
        //  incentiveRequest.RequestTypeId = 1;
        //  incentiveRequest.RequestDate = DateTime.Now;
        //  incentiveRequest.InvoiceNumber = string.Empty;
        //  incentiveRequest.IsActive = false;

        //  context.IncentiveRequest.Add(incentiveRequest);
        //  context.SaveChangesAsync();
        //}

        [HttpDelete("api/incentiveRequestItem/{id:int}")]
        public async Task<bool> DeleteIncentiveRequestItem(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in first", 401);

            return await _IncentiveRequestItemRepoo.DeleteIncentiveRequestItem(id);
        }
    }
}