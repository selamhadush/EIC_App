using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL
{
  public class ServiceTariffRepository : EFRepository<ApplicationDbContext, ServiceTariff>
  {
    public ServiceTariffRepository(ApplicationDbContext context) : base(context)
    { }

    public IEnumerable<ServiceTariffLookup> GetServiceTariffs(int page = 0, int pageSize = 15)
    {
      var servicetariffs = (from sp in Context.ServiceTariff
                            join s in Context.Service on sp.ServiceId equals s.ServiceId
                            join t in Context.Tariff on sp.TariffId equals t.TariffId
                            select new ServiceTariffLookup()
                            {
                              ServiceTariffId = sp.ServiceTariffId,
                              ServiceId = sp.ServiceId,
                              Fee = t.Fee,
                              ServiceNameEnglish = s.NameEnglish
                            }).AsEnumerable();
      if (page > 0)
      {
        servicetariffs = servicetariffs
        .Skip((page - 1) * pageSize)
        .Take(pageSize);
      }

      return servicetariffs;
    }

    //public async Task<List<ServiceTariff>> GetServiceTariff(int page = 0, int pageSize = 15)
    //{
    //    IQueryable<ServiceTariff> servicetariffs = Context.ServiceTariff
    //        .OrderBy(tariff => tariff.ServiceTariffId);
    //    if (page > 0)
    //    {
    //        tariffs = tariffs
    //        .Skip((page - 1) * pageSize)
    //        .Take(pageSize);
    //    }

    //    return await tariffs.ToListAsync();
    //}

    public List<ServiceTariff> GetServiceTariff(object ServiceId)
    {
      List<ServiceTariff> tariff = null;
      try
      {
        int id = (int)ServiceId;
        tariff = Context.ServiceTariff
                               .Where(tariffs => tariffs.ServiceId == id).ToList();
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load ServiceTariff - invalid ServiceTariff id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }

      return tariff;
    }

    public async Task<bool> DeleteServiceTariff(int id)
    {
      var ServiceTariff = await Context.ServiceTariff
          .FirstOrDefaultAsync(tariff => tariff.ServiceTariffId == id);
      if (ServiceTariff == null)
      {
        SetError("ServiceTariff does not exist");
        return false;
      }
      Context.ServiceTariff.Remove(ServiceTariff);
      return await SaveAsync();
    }

    //protected override bool OnValidate(ServiceTariff entity)
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