using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public class LookupTypeRepository : EFRepository<ApplicationDbContext, LookupType>
  {
    public LookupTypeRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<List<LookupType>> GetAllLookupTypes()
    {
      try
      {
        IQueryable<LookupType> lookups = Context.LookupType
            .OrderBy(l => l.DescriptionEnglish);

        return await lookups.ToListAsync();
      }
      catch (Exception ex)
      {
        SetError(ex);
        return null;
      }
    }
    public async Task<List<LookupType>> GetLookupsIncentiveCategoryByLang(string lang)
    {
      try
      {
        return await Context.LookupType
            .Select(l => new LookupType
            {
              LookUpTypeId = l.LookUpTypeId,
              Description = (lang == "et") ? l.Description : l.DescriptionEnglish
            })
            .Where(lookups => lookups.LookUpTypeId == 10774 || lookups.LookUpTypeId == 10775 || lookups.LookUpTypeId == 10776 || lookups.LookUpTypeId == 10777 || lookups.LookUpTypeId == 10778 || lookups.LookUpTypeId == 10779)
            .ToListAsync();
      }
      catch (Exception ex)
      {
        SetError(ex);
        return null;
      }
    }
    public async Task<List<LookupType>> GetLookups(int page = 0, int pageSize = 15)
    {
      IQueryable<LookupType> lookups = Context.LookupType
          .OrderBy(Lookups => Lookups.DescriptionEnglish);
      if (page > 0)
      {
        lookups = lookups
        .Skip((page - 1) * pageSize)
        .Take(pageSize);
      }
      return await lookups.ToListAsync();
    }
    public async Task<List<LookupType>> GetAllLookupsByLang(string lang)
    {
      try
      {
        return await Context.LookupType
            .Select(l => new LookupType
            {
              LookUpTypeId = l.LookUpTypeId,
              Description = (lang == "et") ? l.Description : l.DescriptionEnglish
            })
            .ToListAsync();
      }
      catch (Exception ex)
      {
        SetError(ex);
        return null;
      }
    }
    public override async Task<LookupType> GetRecord(object LookupId)
    {
      LookupType lookup = null;
      try
      {
        int id = (int)LookupId;
        lookup = await Context.LookupType
                                .Where(lookups => lookups.LookUpTypeId == id).FirstOrDefaultAsync();
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load Lookup - invalid Lookup id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }

      return lookup;
    }

    public async Task<bool> DeleteLookup(int id)
    {
      var Lookup = await Context.LookupType
          .FirstOrDefaultAsync(lookup => lookup.LookUpTypeId == id);
      if (Lookup == null)
      {
        SetError("Lookup does not exist");
        return false;
      }
      Context.LookupType.Remove(Lookup);
      return await SaveAsync();
    }

    protected override bool OnValidate(LookupType entity)
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
