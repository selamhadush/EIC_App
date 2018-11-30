using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL
{
  public class TariffRepository : EFRepository<ApplicationDbContext, Tariff>
  {
    public TariffRepository(ApplicationDbContext context) : base(context)
    { }

    //public async Task<List<TariffLookup>> GetTariff()
    //{
    //    try
    //    {
    //        return await Context.Tariff
    //            .Select(r => new TariffLookup
    //            {
    //                TariffId = r.TariffId,
    //                TariffNameEnglish = r.TariffNameEnglish,
    //                TariffName = r.TariffName,
    //                IsActive = r.IsActive
    //            })
    //            .ToListAsync();
    //    }
    //    catch (Exception ex)
    //    {
    //        SetError(ex);
    //        return null;

    //    }
    //}

    public async Task<List<Tariff>> GetTariff(int page = 0, int pageSize = 15)
    {
      IQueryable<Tariff> tariffs = Context.Tariff
          .OrderBy(tariff => tariff.TariffId);
      if (page > 0)
      {
        tariffs = tariffs
        .Skip((page - 1) * pageSize)
        .Take(pageSize);
      }

      return await tariffs.ToListAsync();
    }

    public override async Task<Tariff> GetRecord(object TariffId)
    {
      Tariff tariff = null;
      try
      {
        int id = (int)TariffId;
        tariff = await Context.Tariff
                                .Where(tariffs => tariffs.TariffId == id).FirstOrDefaultAsync();
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load Tariff - invalid Tariff id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }

      return tariff;
    }

    public async Task<bool> DeleteTariff(int id)
    {
      var Tariff = await Context.Tariff
          .FirstOrDefaultAsync(tariff => tariff.TariffId == id);
      if (Tariff == null)
      {
        SetError("Tariff does not exist");
        return false;
      }
      Context.Tariff.Remove(Tariff);
      return await SaveAsync();
    }

    protected override bool OnValidate(Tariff entity)
    {
      if (entity == null)
      {
        ValidationErrors.Add("No record was provided");
        return false;
      }
      if (string.IsNullOrEmpty(entity.Name))
        ValidationErrors.Add("Please enter Name", "Name");
      else if (string.IsNullOrEmpty(entity.Name) || entity.Name.Length < 2)
        ValidationErrors.Add("TariffName Name must be at least 2 charcters long");
      return ValidationErrors.Count < 1;
    }
  }
}