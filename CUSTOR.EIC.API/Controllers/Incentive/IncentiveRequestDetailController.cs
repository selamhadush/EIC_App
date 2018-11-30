using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL;
using CUSTOR.EICOnline.DAL.DataAccessLayer.Incentive;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EICOnline.DAL.EntityLayer.Incentive;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.API.Controllers.Incentive
{
    //[Produces("application/json")]
    [Route("api/IncentiveRequestDetail")]
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    public class IncentiveRequestDetailController : Controller
    {
        private readonly IncentiveBoMRequestItemsRepository _IncentiveBoMRepo;
        private readonly IncentiveRequestDetailRepository _IncentiveRequestDetailRepoo;
        private readonly ApplicationDbContext context;

        public IncentiveRequestDetailController(ApplicationDbContext ctx,
            IncentiveRequestDetailRepository IncentiveRequestDetailRepo,
            IncentiveBoMRequestItemsRepository IncentiveBoMRepo)
        {
            context = ctx;
            _IncentiveRequestDetailRepoo = IncentiveRequestDetailRepo;
            _IncentiveBoMRepo = IncentiveBoMRepo;
        }

        [HttpGet]
        [Route("api/throw")]
        public object Throw()
        {
            throw new InvalidOperationException("This is an unhandled exception");
        }


        [HttpGet]
        [Route("{id:int}")]
        public async Task<IEnumerable<IncentiveRequestDetail>> GetIncentiveRequestDetails(int id, int page = -1,
            int pageSize = 15)
        {
            return await _IncentiveRequestDetailRepoo.GetIncentiveRequestDetails(id, page, pageSize);
        }

        [HttpGet]
        [Route("DetailByProjectId{id:int}")]
        public async Task<IEnumerable<IncentiveRequestDetail>> GetIncentiveRequestDetailsByProjectId(int id,
            int page = -1, int pageSize = 15)
        {
            return await _IncentiveRequestDetailRepoo.GetIncentiveRequestDetails(id, page, pageSize);
        }

        [HttpGet("BillOfMaterial/{id}")]
        public async Task<IEnumerable<IncentiveRequestDetail>> GetIncentiveDetailsByProjectId(int id, int page = -1,
            int pageSize = 15)
        {
            return await _IncentiveRequestDetailRepoo.GetIncentiveRequestDetailsByProjectId(id, page, pageSize);
        }

        [HttpPost]
        public async Task<IncentiveRequestDetail> SaveIncentiveRequestDetail(
            [FromBody] IncentiveRequestDetail PostedGetIncentiveRequestDetail)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);


            try
            {
                using (var transaction = await _IncentiveRequestDetailRepoo.Context.Database.BeginTransactionAsync())
                {
                    //construction materials or lab equipment
                    if (PostedGetIncentiveRequestDetail.IncentiveCategoryId == 10778 ||
                        PostedGetIncentiveRequestDetail.IncentiveCategoryId == 10779)
                    {
                        var newBalance = PostedGetIncentiveRequestDetail.Balance -
                                         PostedGetIncentiveRequestDetail.ApprovedQty;
                        var intBoMTableId = PostedGetIncentiveRequestDetail.IncentiveItemId;
                        var incentiveBoMRequestItem =
                            await _IncentiveBoMRepo.Context.IncentiveBoMRequestItem.SingleOrDefaultAsync(m =>
                                m.IncentiveBoMRequestItemId == intBoMTableId);
                        if (incentiveBoMRequestItem != null)
                        {
                            incentiveBoMRequestItem.Balance = newBalance;
                            _IncentiveRequestDetailRepoo.Context.Entry(incentiveBoMRequestItem).State =
                                EntityState.Modified;
                            await _IncentiveBoMRepo.SaveAsync(incentiveBoMRequestItem);
                        }
                    }

                    if (!await _IncentiveRequestDetailRepoo.SaveAsync(PostedGetIncentiveRequestDetail))
                    {
                        transaction.Rollback();
                        throw new ApiException(_IncentiveRequestDetailRepoo.ErrorMessage);
                    }

                    transaction.Commit();
                }
            }
            catch (Exception e)
            {
                throw new ApiException(e.Message);
            }


            return PostedGetIncentiveRequestDetail;
        }

        [HttpPut]
        public async Task<IncentiveRequestDetail> UpdateIncentiveRequestDetail(
            [FromBody] IncentiveRequestDetail PostedGetIncentiveRequestDetail)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);

            try
            {
                using (var transaction = await _IncentiveRequestDetailRepoo.Context.Database.BeginTransactionAsync())
                {
                    //construction materials or lab equipment
                    if (PostedGetIncentiveRequestDetail.IncentiveCategoryId == 10778 ||
                        PostedGetIncentiveRequestDetail.IncentiveCategoryId == 10779)
                    {
                        var newBalance =
                            PostedGetIncentiveRequestDetail.Balance; // - PostedGetIncentiveRequestDetail.ApprovedQty;
                        var intBoMTableId = PostedGetIncentiveRequestDetail.IncentiveItemId;
                        var incentiveBoMRequestItem =
                            await _IncentiveBoMRepo.Context.IncentiveBoMRequestItem.SingleOrDefaultAsync(m =>
                                m.IncentiveBoMRequestItemId == intBoMTableId);
                        if (incentiveBoMRequestItem != null)
                        {
                            incentiveBoMRequestItem.Balance = newBalance;
                            _IncentiveRequestDetailRepoo.Context.Entry(incentiveBoMRequestItem).State =
                                EntityState.Modified;
                            await _IncentiveBoMRepo.SaveAsync(incentiveBoMRequestItem);
                        }
                    }

                    if (!await _IncentiveRequestDetailRepoo.SaveAsync(PostedGetIncentiveRequestDetail))
                    {
                        transaction.Rollback();
                        throw new ApiException(_IncentiveRequestDetailRepoo.ErrorMessage);
                    }

                    transaction.Commit();
                }
            }
            catch (Exception e)
            {
                throw new ApiException(e.Message);
            }

            return PostedGetIncentiveRequestDetail;
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<bool> DeleteIncentiveRequestDetail(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in first", 401);
            try
            {
                using (var transaction = await _IncentiveRequestDetailRepoo.Context.Database.BeginTransactionAsync())
                {
                    //construction materials or lab equipment
                    var incentiveRequestDetail =
                        await _IncentiveRequestDetailRepoo.Context.IncentiveRequestDetail.SingleOrDefaultAsync(m =>
                            m.IncentiveRequestDetailId == id);
                    if (incentiveRequestDetail != null &&
                        (incentiveRequestDetail.IncentiveCategoryId == 10778 ||
                         incentiveRequestDetail.IncentiveCategoryId == 10779))
                    {
                        var incentiveBoMRequestItem =
                            await _IncentiveBoMRepo.Context.IncentiveBoMRequestItem.SingleOrDefaultAsync(m =>
                                m.IncentiveBoMRequestItemId == incentiveRequestDetail.IncentiveItemId);
                        if (incentiveBoMRequestItem != null)
                        {
                            var bal = incentiveBoMRequestItem.Balance; //previous balance
                            incentiveBoMRequestItem.Balance = incentiveRequestDetail.ApprovedQty + bal;
                            _IncentiveRequestDetailRepoo.Context.Entry(incentiveBoMRequestItem).State =
                                EntityState.Modified;
                            await _IncentiveBoMRepo.SaveAsync(incentiveBoMRequestItem);
                        }
                    }


                    if (!_IncentiveRequestDetailRepoo.Delete(id, true))
                    {
                        transaction.Rollback();
                        throw new ApiException(_IncentiveRequestDetailRepoo.ErrorMessage);
                    }

                    transaction.Commit();
                }
            }
            catch (Exception e)
            {
                throw new ApiException(e.Message);
            }

            return true;
        }

        [HttpGet("getSparePart/{id:int}")]
        public IEnumerable<IncentiveDetailDto> GetSparePart(int id)
        {
            var ProjectId = new SqlParameter("@ProjectId", id);
            IEnumerable<IncentiveDetailDto> series = context.Query<IncentiveDetailDto>().FromSql(
                    "select (select isNull(Sum(Amount)*.15,0.00) From IncentiveRequestDetail Where IncentiveCategoryId='10774') as TotalAmount, sum(Amount) as Amount,sum(ApprovedQty) as ApprovedQty,(select isNull(Sum(Amount)*.15,0.00) From IncentiveRequestDetail Where IncentiveCategoryId='10774')-sum(Amount) as Balance from IncentiveRequestDetail "
                    //// + " Inner Join LookUpType on LookupType.LookUpTypeId = IncentiveRequestDetail.IncentiveCategoryId "
                    + " where IncentiveCategoryId = '10774' AND ProjectId={0}"
                    + "  ", id)
                .ToList();
            return series;
        }
    }
}