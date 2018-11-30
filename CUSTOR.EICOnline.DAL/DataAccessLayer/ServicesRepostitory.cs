using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public class ServicesRepository : EFRepository<ApplicationDbContext, Service>
  {
    public ServicesRepository(ApplicationDbContext context) : base(context)
    { }

    public async Task<List<Service>> GetServices2()
    {
      try
      {
        return await Context.Service.Where(x => x.IsActive == true)
            //.Select(r => new Service
            //{
            //  ServiceId = r.ServiceId,
            //  NameEnglish = r.NameEnglish,
            //  Name = r.Name,
            //  IsActive = r.IsActive
            //})
            .ToListAsync();
      }
      catch (Exception ex)
      {
        SetError(ex);
        return null;
      }
    }

    public async Task<List<Service>> GetServices(int page = 0, int pageSize = 15)
    {
      IQueryable<Service> services = Context.Service
.Where(c => c.IsActive == true && c.TypeOfService == "0")
          .OrderBy(prerequisite => prerequisite.ServiceId);
      if (page > 0)
      {
        services = services
        .Skip((page - 1) * pageSize)
        .Take(pageSize);
      }

      return await services.ToListAsync();
    }
    public async Task<List<Service>> GetIncentiveServices(int page = 0, int pageSize = 15)
    {
      IQueryable<Service> services = Context.Service
.Where(c => c.IsActive == true && c.TypeOfService == "1")
          .OrderBy(prerequisite => prerequisite.ServiceId);
      if (page > 0)
      {
        services = services
        .Skip((page - 1) * pageSize)
        .Take(pageSize);
      }

      return await services.ToListAsync();
    }

    public override async Task<Service> GetRecord(object ServiceId)
    {
      Service service = null;
      try
      {
        int id = (int)ServiceId;
        service = await Context.Service
                                .Where(prerequisite => prerequisite.ServiceId == id).FirstOrDefaultAsync();
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load Service - invalid Service id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }

      return service;
    }

    public async Task<bool> DeleteService(int id)
    {
      var Service = await Context.Service
          .FirstOrDefaultAsync(prerequisite => prerequisite.ServiceId == id);
      if (Service == null)
      {
        SetError("Service does not exist");
        return false;
      }
      Context.Service.Remove(Service);
      return await SaveAsync();
    }

    protected override bool OnValidate(Service entity)
    {
      if (entity == null)
      {
        ValidationErrors.Add("No record was provided");
        return false;
      }
      if (string.IsNullOrEmpty(entity.Name))
        ValidationErrors.Add("Please enter ServiceName", "ServiceName");
      else if (string.IsNullOrEmpty(entity.Name) || entity.Name.Length < 2)
        ValidationErrors.Add("ServiceName Name must be at least 2 charcters long");
      return ValidationErrors.Count < 1;
    }
  }
}