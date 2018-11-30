using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CUSTOR.EICOnline.DAL.DataAccessLayer.Incentive
{
    public class IncentiveBoMRequestItemsRepository : EFRepository<ApplicationDbContext, IncentiveBoMRequestItem>
    {
        public IncentiveBoMRequestItemsRepository(ApplicationDbContext context) : base(context)
        { }

        public async Task<List<IncentiveBoMRequestItem>> GetActivitys(int page = 0, int pageSize = 15)
        {
            IQueryable<IncentiveBoMRequestItem> incentiveBoMRequestItems = Context.IncentiveBoMRequestItem

                .OrderBy(Act => Act.IncentiveBoMRequestItemId);
            if (page > 0)
            {
                incentiveBoMRequestItems = incentiveBoMRequestItems
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
            }

            return await incentiveBoMRequestItems.ToListAsync();
        }

        public Task<List<IncentiveBoMRequestItem>> GetIncentiveBoMRequestItemByProjectId(int id, int page = 0, int pageSize = 15)
        {
            IQueryable<IncentiveBoMRequestItem> IncentiveBoMRequestItems = Context.IncentiveBoMRequestItem
                .Where(Ince => Ince.ProjectId == id);
            if (page > 0)
            {
                IncentiveBoMRequestItems = IncentiveBoMRequestItems
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
            }

            return IncentiveBoMRequestItems.ToListAsync();
        }

        public async Task<IEnumerable<IncentiveBoMRequestItem>> GetAllItems(int projectId, int incentiveCategoryId)
        {
            var incentiveBoMRequestItems = Context.IncentiveBoMRequestItem
                .Where(item => item.ProjectId == projectId && item.IncentiveCategoryId == incentiveCategoryId)
                .OrderBy(item => item.Description);
            return await incentiveBoMRequestItems.ToListAsync();
        }
        public async Task<IncentiveBoMRequestItem> GetItem(int id)
        {
            var incentiveBoMRequestItem = Context.IncentiveBoMRequestItem
                .Where(item => item.IncentiveBoMRequestItemId == id)
                .FirstOrDefaultAsync();
            return await incentiveBoMRequestItem;
        }
    }
}