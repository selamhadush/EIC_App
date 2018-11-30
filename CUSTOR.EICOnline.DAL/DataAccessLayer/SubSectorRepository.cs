using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL
{
  public class SubSectorRepository : EFRepository<ApplicationDbContext, SubSector>
  {
    public SubSectorRepository(ApplicationDbContext context) : base(context)
    { }

    public async Task<List<SubSector>> GetSubSectors(int page = 0, int pageSize = 15)
    {
      IQueryable<SubSector> subsectors = Context.SubSector
        .Include(s => s.Sector)
                           .OrderBy(subsector => subsector.SubSectorId);
      if (page > 0)
      {
        subsectors = subsectors
        .Skip((page - 1) * pageSize)
        .Take(pageSize);
      }

      return await subsectors.ToListAsync();
    }

    public SubSector GetSubSector(object SubSectorId)
    {
      SubSector subsectors = null;
      try
      {
        int id = (int)SubSectorId;
        subsectors = Context.SubSector
            .Include(s => s.Sector)
                               .Where(subss => subss.SubSectorId == id).FirstOrDefault();
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load SubSector - invalid SubSector id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }
      return subsectors;
    }

    public async Task<bool> DeleteSubSector(int id)
    {
      var SubSector = await Context.SubSector
          .FirstOrDefaultAsync(sector => sector.SubSectorId == id);
      if (SubSector == null)
      {
        SetError("SubSector does not exist");
        return false;
      }
      Context.SubSector.Remove(SubSector);
      return await SaveAsync();
    }

    //protected override bool OnValidate(SubSector entity)
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