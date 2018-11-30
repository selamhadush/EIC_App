using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EICOnline.DAL.EntityLayer.Incentive;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL
{
    public class IncentiveRequestDetailRepository : EFRepository<ApplicationDbContext, IncentiveRequestDetail>
    {
        public IncentiveRequestDetailRepository(ApplicationDbContext context) : base(context)
        { }

        public Task<List<IncentiveRequestDetail>> GetIncentiveRequestDetails(int id, int page = 0, int pageSize = 15)
        {
            IQueryable<IncentiveRequestDetail> IncentiveRequestDetails = Context.IncentiveRequestDetail
                .Where(Ince => Ince.IncentiveRequestId == id);
            if (page > 0)
            {
                IncentiveRequestDetails = IncentiveRequestDetails
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
            }

            return IncentiveRequestDetails.ToListAsync();
        }

        public Task<List<IncentiveRequestDetail>> GetIncentiveRequestDetailsByProjectId(int id, int page = 0, int pageSize = 15)
        {
            IQueryable<IncentiveRequestDetail> IncentiveRequestDetails = Context.IncentiveRequestDetail
                .Where(Ince => Ince.ProjectId == id);
            if (page > 0)
            {
                IncentiveRequestDetails = IncentiveRequestDetails
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
            }

            return IncentiveRequestDetails.ToListAsync();
        }

        public IncentiveRequestDetail GetIncentiveRequestDetail(object IncentiveRequestIteId)
        {
            IncentiveRequestDetail IncentiveRequestDetails = null;
            try
            {
                int id = (int)IncentiveRequestIteId;
                IncentiveRequestDetails = Context.IncentiveRequestDetail
                                        .Where(subss => subss.IncentiveRequestDetailId == id).FirstOrDefault();
            }
            catch (InvalidOperationException)
            {
                SetError("Couldn't load IncentiveRequestDetail - invalid IncentiveRequestDetail id specified.");
                return null;
            }
            catch (Exception ex)
            {
                SetError(ex);
            }
            return IncentiveRequestDetails;
        }

        public async Task<bool> DeleteIncentiveRequestDetail(int id)
        {
            var incentiveRequestDetail = await Context.IncentiveRequestDetail
                .FirstOrDefaultAsync(inv => inv.IncentiveRequestDetailId == id);
            if (incentiveRequestDetail == null)
            {
                SetError("IncentiveRequestDetail does not exist");
                return false;
            }
            Context.IncentiveRequestDetail.Remove(incentiveRequestDetail);
            return await SaveAsync();
        }

    }
}

