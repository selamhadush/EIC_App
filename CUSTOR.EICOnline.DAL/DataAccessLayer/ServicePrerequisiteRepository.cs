using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using EIC.Investment.API.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL
{
  public class ServicePrerequisiteRepository : EFRepository<ApplicationDbContext, ServicePrerequisite>
  {
    public ServicePrerequisiteRepository(ApplicationDbContext context) : base(context)
    {
    }

    public override async Task<ServicePrerequisite> GetRecord(object ServicePrerequisiteId)
    {
      ServicePrerequisite servicePrerequisite = null;
      try
      {
        int id = (int)ServicePrerequisiteId;

        servicePrerequisite = await Context.ServicePrerequisite
                                .Include(p => p.Service)
                                .Where(prerequisite => prerequisite.ServicePrerequisiteId == id)
                                .FirstOrDefaultAsync();
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load ServicePrerequisite - invalid ServicePrerequisite id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }

      return servicePrerequisite;
    }

    public override async Task<ServicePrerequisite> GetRecord(object descEng, object serviceId)
    {
      ServicePrerequisite servicePrerequisite = null;
      try
      {
        int Id = (int)serviceId;
        string DescriptionEnglish = (string)descEng;

        servicePrerequisite = await Context.ServicePrerequisite
                        .FirstOrDefaultAsync(prerequisite => prerequisite.ServiceId == Id);
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load servicePrerequisite - invalid servicePrerequisite id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }

      return servicePrerequisite;
    }

    public IEnumerable<ServicePrerequisiteVM> GetAllServicePrerequisites(int page = 0, int pageSize = 15)
    {
      var servicePrerequisites = (from sp in Context.ServicePrerequisite
                                  join s in Context.Service on sp.ServiceId equals s.ServiceId
                                  select new ServicePrerequisiteVM()
                                  {
                                    ServicePrerequisiteId = sp.ServicePrerequisiteId,
                                    Description = sp.Description,
                                    DescriptionEnglish = sp.DescriptionEnglish,
                                    ServiceId = sp.ServiceId,
                                    ServiceNameEnglish = s.NameEnglish
                                  }).AsEnumerable();
      //IQueryable<ServicePrerequisite> servicePrerequisites = Context.ServicePrerequisite
      //    .Include(p =>p.Service)
      //    .OrderBy(prerequisite => prerequisite.ServicePrerequisiteId);
      if (page > 0)
      {
        servicePrerequisites = servicePrerequisites
        .Skip((page - 1) * pageSize)
        .Take(pageSize);
      }

      return servicePrerequisites;
    }

    public async Task<List<ServicePrerequisite>> GetAllServicePrerequisitesBySectorId(int SectorId)
    {
      var servicePrerequisites = await Context.ServicePrerequisite
           .Where(p => p.ServiceId == SectorId).ToListAsync();

      return servicePrerequisites;
    }

    public async Task<bool> DeleteServicePrerequisite(int id)
    {
      var ServicePrerequisite = await Context.ServicePrerequisite
          .FirstOrDefaultAsync(prerequisite => prerequisite.ServicePrerequisiteId == id);
      if (ServicePrerequisite == null)
      {
        SetError("ServicePrerequisite does not exist");
        return false;
      }
      Context.ServicePrerequisite.Remove(ServicePrerequisite);
      return await SaveAsync();
    }

    protected override bool OnValidate(ServicePrerequisite entity)
    {
      if (entity == null)
      {
        ValidationErrors.Add("No record was provided");
        return false;
      }
      if (string.IsNullOrEmpty(entity.Description))
        ValidationErrors.Add("Please enter Description", "Description");
      else if (string.IsNullOrEmpty(entity.Description) || entity.Description.Length < 2)
        ValidationErrors.Add("Description Name must be at least 2 charcters long");
      return ValidationErrors.Count < 1;
    }
  }
}