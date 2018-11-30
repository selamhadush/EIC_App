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
  public class IncentiveRequestItemRepository : EFRepository<ApplicationDbContext, IncentiveRequestItem>
  {
    public IncentiveRequestItemRepository(ApplicationDbContext context) : base(context)
    { }

    public Task<List<IncentiveRequestItem>> GetIncentiveRequestItems(int id, int page = 0, int pageSize = 15)
    {
      IQueryable<IncentiveRequestItem> IncentiveRequestItems = Context.IncentiveRequestItem
          .Where(Ince => Ince.ProjectId == id);
      if (page > 0)
      {
        IncentiveRequestItems = IncentiveRequestItems
        .Skip((page - 1) * pageSize)
        .Take(pageSize);
      }

      return IncentiveRequestItems.ToListAsync();
    }
    //public IEnumerable<Incentive_RequestItemLookup> GetIncentiveRequestItems(int id, int page = 0, int pageSize = 15)
    //{
    //    var incentiverequestitems = (from i in Context.IncentiveRequestItem
    //                                 join l in Context.Lookup on i.IncentiveRequestItemId equals l.LookupId
    //                                 join lt in Context.LookupType on i.IncentiveCategoryId equals lt.LookUpTypeId
    //                                 select new Incentive_RequestItemLookup()
    //                                 {
    //                                     Amount = i.Amount,
    //                                     UnitId = i.UnitId,
    //                                     IncentiveItem = l.English,
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
    public IncentiveRequestItem GetIncentiveRequestItem(object IncentiveRequestIteId)
    {
      IncentiveRequestItem incentiveRequestItems = null;
      try
      {
        int id = (int)IncentiveRequestIteId;
        incentiveRequestItems = Context.IncentiveRequestItem
                               //.Include(s => s.Sector)
                               .Where(subss => subss.IncentiveRequestItemId == id).FirstOrDefault();
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load IncentiveRequestItem - invalid IncentiveRequestItem id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }
      return incentiveRequestItems;
    }

    public async Task<bool> DeleteIncentiveRequestItem(int id)
    {
      var IncentiveRequestItem = await Context.IncentiveRequestItem
          .FirstOrDefaultAsync(incentiveRequestItem => incentiveRequestItem.IncentiveRequestItemId == id);
      if (IncentiveRequestItem == null)
      {
        SetError("IncentiveRequestItem does not exist");
        return false;
      }
      Context.IncentiveRequestItem.Remove(IncentiveRequestItem);
      return await SaveAsync();
    }

    //protected override bool OnValidate(IncentiveRequestItem entity)
    //{
    //    if (entity == null)
    //    {
    //        ValidationErrors.Add("No record was provided");
    //        return false;
    //    }
    //    //if (string.IsNullOrEmpty(entity.Name))
    //    //    ValidationErrors.Add("Please enter Name", "Name");
    //    //else if (string.IsNullOrEmpty(entity.Name) || entity.Name.Length < 2)
    //    //    ValidationErrors.Add("TariffName Name must be at least 2 charcters long");
    //    return ValidationErrors.Count < 1;
    //}
  }
}
