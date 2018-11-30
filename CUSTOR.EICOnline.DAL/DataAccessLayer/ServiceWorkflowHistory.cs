using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL.DataAccessLayer
{
  public class ServiceWorkflowHistoryRepo : EFRepository<ApplicationDbContext, ServiceWorkflowHistory>
  {
    public ServiceWorkflowHistoryRepo(ApplicationDbContext context) : base(context)
    { }

    public async Task<List<ServiceWorkflowHistory>> GetServiceWorkflowHistories(int page = 0, int pageSize = 15)
    {
      IQueryable<ServiceWorkflowHistory> Acts = Context.ServiceWorkflowHistories
          .OrderBy(Act => Act.ServiceWorkflowHistoryId);
      if (page > 0)
      {
        Acts = Acts
        .Skip((page - 1) * pageSize)
        .Take(pageSize);
      }

      return await Acts.ToListAsync();
    }

    public Activity GetActivity(object ActivityId)
    {
      Activity Act = null;
      try
      {
        int id = (int)ActivityId;
        Act = Context.Activity
            .Include(s => s.SubSector)
                               .Where(Acts => Acts.ActivityId == id).FirstOrDefault();
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load Activity - invalid Activity id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }
      return Act;
    }



  }
}
