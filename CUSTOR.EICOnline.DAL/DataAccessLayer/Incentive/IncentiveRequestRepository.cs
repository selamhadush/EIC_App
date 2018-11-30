using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EICOnline.DAL.EntityLayer.Incentive;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CUSTOR.EICOnline.DAL
{
    public class IncentiveRequestRepository : EFRepository<ApplicationDbContext, IncentiveRequest>
    {
        public IncentiveRequestRepository(ApplicationDbContext context) : base(context)
        { }

        public Task<List<IncentiveRequest>> GetIncentiveRequests(int id, int page = 0, int pageSize = 15)
        {
            IQueryable<IncentiveRequest> IncentiveRequests = Context.IncentiveRequest
                .Where(Ince => Ince.ProjectId == id);
            if (page > 0)
            {
                IncentiveRequests = IncentiveRequests
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
            }

            return IncentiveRequests.ToListAsync();
        }
        //public IEnumerable<Incentive_RequestLookup> GetIncentiveRequests(int id, int page = 0, int pageSize = 15)
        //{
        //    var incentiverequestitems = (from i in Context.IncentiveRequest
        //                                 join l in Context.Lookup on i.IncentiveRequestId equals l.LookupId
        //                                 join lt in Context.LookupType on i.IncentiveCategoryId equals lt.LookUpTypeId
        //                                 select new Incentive_RequestLookup()
        //                                 {
        //                                     Amount = i.Amount,
        //                                     UnitId = i.UnitId,
        //                                     Incentive = l.English,
        //                                     IncentiveCategory = lt.DescriptionEnglish
        //                                 }).AsEnumerable()
        //                                .Where(i => i.ProjectId == id);


        //    if (page > 0)
        //    {
        //        incentiverequestitems = incentiverequestitems
        //        .Skip((page - 1) * pageSize)
        //        .Take(pageSize);
        //    }

        //    return incentiverequestitems;
        //}
        public IncentiveRequest GetIncentiveRequest(object IncentiveRequestIteId)
        {
            IncentiveRequest incentiveRequests = null;
            try
            {
                int id = (int)IncentiveRequestIteId;
                incentiveRequests = Context.IncentiveRequest
                                       //.Include(s => s.Sector)
                                       .Where(subss => subss.IncentiveRequestId == id).FirstOrDefault();
            }
            catch (InvalidOperationException)
            {
                SetError("Couldn't load IncentiveRequest - invalid IncentiveRequest id specified.");
                return null;
            }
            catch (Exception ex)
            {
                SetError(ex);
            }
            return incentiveRequests;
        }

        public async Task<bool> DeleteIncentiveRequest(int id)
        {
            var IncentiveRequest = await Context.IncentiveRequest
                .FirstOrDefaultAsync(incentiveRequest => incentiveRequest.IncentiveRequestId == id);
            if (IncentiveRequest == null)
            {
                SetError("IncentiveRequest does not exist");
                return false;
            }
            Context.IncentiveRequest.Remove(IncentiveRequest);
            return await SaveAsync();
        }

        public Task<List<IncentiveRequest>> GetIncentiveRequestsByServiceAppId(int id, int page = 0, int pageSize = 15)
        {
            IQueryable<IncentiveRequest> IncentiveRequests = Context.IncentiveRequest
                .Where(Ince => Ince.ServiceApplicationId == id);
            if (page > 0)
            {
                IncentiveRequests = IncentiveRequests
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
            }

            return IncentiveRequests.ToListAsync();
        }
        public Task<List<IncentiveRequest>> GetIncentiveRequestsByServiceAppId(int id, int id1, int page = 0, int pageSize = 15)
        {
            IQueryable<IncentiveRequest> IncentiveRequests = Context.IncentiveRequest
                .Where(Ince => Ince.ServiceApplicationId != id1 && Ince.ProjectId == id);
            if (page > 0)
            {
                IncentiveRequests = IncentiveRequests
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
            }

            return IncentiveRequests.ToListAsync();
        }
        public Task<List<IncentiveRequest>> GetIncentiveRequestsByOtherServiceAppId(int id, int page = 0, int pageSize = 15)
        {
            IQueryable<IncentiveRequest> IncentiveRequests = Context.IncentiveRequest
                .Where(Ince => Ince.ServiceApplicationId != id);
            if (page > 0)
            {
                IncentiveRequests = IncentiveRequests
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
            }

            return IncentiveRequests.ToListAsync();
        }
    }
}
