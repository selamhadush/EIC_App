using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EICOnline.DAL.EntityLayer.Incentive;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CUSTOR.EICOnline.API.Controllers.Incentive
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    public class IncentiveRequestController : Controller
    {
        private ApplicationDbContext context;
        private IncentiveRequestRepository _IncentiveRequestRepoo;
        public IncentiveRequestController(ApplicationDbContext ctx, IncentiveRequestRepository IncentiveRequestRepo)
        {
            context = ctx;
            _IncentiveRequestRepoo = IncentiveRequestRepo;
        }

        [HttpGet]
        [Route("api/throw")]
        public object Throw()
        {
            throw new InvalidOperationException("This is an unhandled exception");
        }


        [HttpGet]
        [Route("api/IncentiveRequest/ByServiceAppId/{id:int}")]
        public async Task<IEnumerable<IncentiveRequest>> GetIncentiveRequestsByServiceAppId(int id, int page = -1, int pageSize = 10)
        {
            return await _IncentiveRequestRepoo.GetIncentiveRequestsByServiceAppId(id, page, pageSize);
        }

        [HttpGet]
        [Route("api/incentiveRequests/ByIds/{id:int}/{id1:int}")]
        public async Task<IEnumerable<IncentiveRequest>> GetIncentiveRequestsByIds(int id, int id1, int page = -1, int pageSize = 10)
        {
            return await _IncentiveRequestRepoo.GetIncentiveRequestsByServiceAppId(id, id1, page, pageSize);
        }
        [HttpGet]
        [Route("api/incentiveRequests/ByOtherServiceAppId/{id:int}")]
        public async Task<IEnumerable<IncentiveRequest>> GetIncentiveRequestsByOtherServiceAppId(int id, int page = -1, int pageSize = 10)
        {
            return await _IncentiveRequestRepoo.GetIncentiveRequestsByOtherServiceAppId(id, page, pageSize);
        }

        [HttpGet]
        [Route("api/incentiveRequests/ByProjectId/{id:int}")]
        public async Task<IEnumerable<IncentiveRequest>> GetIncentiveRequests(int id, int page = -1, int pageSize = 10)
        {
            return await _IncentiveRequestRepoo.GetIncentiveRequests(id, page, pageSize);
        }

        [HttpPost("api/incentiveRequest")]
        public async Task<IncentiveRequest> SaveIncentiveRequest([FromBody] IncentiveRequest PostedGetIncentiveRequest)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);
            //if (!_IncentiveRequestRepoo.Validate(PostedGetIncentiveRequest))
            //    throw new ApiException(_IncentiveRequestRepoo.ErrorMessage, 500, _IncentiveRequestRepoo.ValidationErrors);
            if (!await _IncentiveRequestRepoo.SaveAsync(PostedGetIncentiveRequest))
            {
                throw new ApiException(_IncentiveRequestRepoo.ErrorMessage);
            }
            return PostedGetIncentiveRequest;
        }

        [Route("api/incentiveRequest/{id:int}")]
        [HttpDelete]
        public async Task<bool> DeleteIncentiveRequest(int id)
        {
            return await _IncentiveRequestRepoo.DeleteIncentiveRequest(id);
        }
    }
}

