using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL
{
  public class SectorRepository : EFRepository<ApplicationDbContext, Sector>
  {
    public SectorRepository(ApplicationDbContext context) : base(context)
    { }

    public async Task<List<Sector>> GetSectors(int page = 0, int pageSize = 15)
    {
      IQueryable<Sector> sectors = Context.Sector
          .OrderBy(sector => sector.SectorId);
      if (page > 0)
      {
        sectors = sectors
        .Skip((page - 1) * pageSize)
        .Take(pageSize);
      }

      return await sectors.ToListAsync();
    }

    public IEnumerable<Sector> GetSector(object SectorId)
    {
      IEnumerable<Sector> sector = null;
      try
      {
        int id = (int)SectorId;
        sector = Context.Sector
                               .Where(sectors => sectors.SectorId == id).AsEnumerable();
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load Sector - invalid Sector id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }
      return sector;
    }

    public async Task<bool> DeleteSector(int id)
    {
      var Sector = await Context.Sector
          .FirstOrDefaultAsync(sector => sector.SectorId == id);
      if (Sector == null)
      {
        SetError("Sector does not exist");
        return false;
      }
      Context.Sector.Remove(Sector);
      return await SaveAsync();
    }

    //protected override bool OnValidate(Sector entity)
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