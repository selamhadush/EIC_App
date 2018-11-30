using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL
{
  public class InvestmentActivityRepository : EFRepository<ApplicationDbContext, InvestmentActivity>
  {
    public InvestmentActivityRepository(ApplicationDbContext context) : base(context)
    { }

    public async Task<List<InvestmentActivity>> GetInvestmentActivitys(int page = 0, int pageSize = 15)

    {
      IQueryable<InvestmentActivity> Acts = Context.InvestmentActivity
          .Include(a => a.Activity)
          //.Include(sb => sb.SubSector)
          //.Include(s => s.Sector)
          .OrderBy(Act => Act.InvActivityId);
      if (page > 0)
      {
        Acts = Acts
        .Skip((page - 1) * pageSize)
        .Take(pageSize);
      }

      return await Acts.ToListAsync();
    }

    public InvestmentActivity GetInvestmentActivityByProjectId(object ProjectId)
    {
      InvestmentActivity InvAct = null;
      try
      {
        int id = (int)ProjectId;
        InvAct = Context.InvestmentActivity
            .Include(a => a.Project)
            .Where(Inv => Inv.Project.ProjectId == id).FirstOrDefault();
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load InvestmentActivity - invalid InvestmentActivity id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }
      return InvAct;
    }
    public InvestmentActivity GetInvestmentActivity(object InvActivityId)
    {
      InvestmentActivity InvAct = null;
      try
      {
        int id = (int)InvActivityId;
        InvAct = Context.InvestmentActivity
            .Include(a => a.Activity)
                               .ThenInclude(s => s.SubSector)
                               .Where(Inv => Inv.InvActivityId == id).FirstOrDefault();
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load InvestmentActivity - invalid InvestmentActivity id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }
      return InvAct;
    }

    public async Task<bool> DeleteInvestmentActivity(int id)
    {
      var InvestmentActivity = await Context.InvestmentActivity
          .FirstOrDefaultAsync(Act => Act.InvActivityId == id);
      if (InvestmentActivity == null)
      {
        SetError("InvestmentActivity does not exist");
        return false;
      }
      Context.InvestmentActivity.Remove(InvestmentActivity);
      return await SaveAsync();
    }

    //protected override bool OnValidate(InvestmentActivity entity)
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