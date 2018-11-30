using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL
{
  public class ActivityRepository : EFRepository<ApplicationDbContext, Activity>
  {
    public ActivityRepository(ApplicationDbContext context) : base(context)
    { }

    public async Task<List<Activity>> GetActivitys(int page = 0, int pageSize = 15)
    {
      IQueryable<Activity> Acts = Context.Activity
          .Include(s => s.SubSector)
          .OrderBy(Act => Act.ActivityId);
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

    public async Task<bool> DeleteActivity(int id)
    {
      var Activity = await Context.Activity
          .FirstOrDefaultAsync(Act => Act.ActivityId == id);
      if (Activity == null)
      {
        SetError("Activity does not exist");
        return false;
      }
      Context.Activity.Remove(Activity);
      return await SaveAsync();
    }

    //protected override bool OnValidate(Activity entity)
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