using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL
{
  public class ServiceStepperRepository : EFRepository<ApplicationDbContext, ServiceStep>
  {
    public ServiceStepperRepository(ApplicationDbContext context) : base(context)
    {
    }

    public ServiceStep GetRecord(int ServiceStepId)
    {
      ServiceStep serviceStep = null;
      try
      {
        int id = (int)ServiceStepId;

        serviceStep = Context.ServiceStep
                                //.Include(p => p.Service)
                                .Where(prerequisite => prerequisite.ServiceStepId == id).FirstOrDefault();
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load ServiceStep - invalid ServiceStep id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }

      return serviceStep;
    }

    public async Task<List<ServiceStep>> GeServiceSteps(int page = 0, int pageSize = 15)
    {
      IQueryable<ServiceStep> servicesteppers = Context.ServiceStep
        .Include(s => s.Service)
                           .OrderBy(servicestepper => servicestepper.ServiceStepId);
      if (page > 0)
      {
        servicesteppers = servicesteppers
        .Skip((page - 1) * pageSize)
        .Take(pageSize);
      }

      return await servicesteppers.ToListAsync();
    }

    public async Task<bool> DeleteServiceStep(int id)
    {
      var ServiceStep = await Context.ServiceStep
          .FirstOrDefaultAsync(servicestep => servicestep.ServiceStepId == id);
      if (ServiceStep == null)
      {
        SetError("ServiceStep does not exist");
        return false;
      }
      Context.ServiceStep.Remove(ServiceStep);
      return await SaveAsync();
    }

    protected override bool OnValidate(ServiceStep entity)
    {
      if (entity == null)
      {
        ValidationErrors.Add("No record was provided");
        return false;
      }
      if (string.IsNullOrEmpty(entity.NameEnglish))
        ValidationErrors.Add("Please enter NameEnglish", "NameEnglish");
      else if (string.IsNullOrEmpty(entity.NameEnglish) || entity.NameEnglish.Length < 2)
        ValidationErrors.Add("NameEnglish Name must be at least 2 charcters long");
      return ValidationErrors.Count < 1;
    }
  }
}