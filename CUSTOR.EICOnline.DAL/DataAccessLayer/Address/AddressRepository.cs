using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL
{
  public class RegionRepository : EFRepository<ApplicationDbContext, Region>
  {
    public RegionRepository(ApplicationDbContext context) : base(context)
    { }

    public async Task<List<Region>> GetRegions()
    {
      try
      {
        return await Context.Regions.ToListAsync();
        //.Select(r => new RegionViewModel
        //{
        //    RegionId = r.RegionId,
        //    DescriptionEnglish = r.DescriptionEnglish,
        //    Description = r.Description
        //})
        //.ToListAsync();
      }
      catch (Exception ex)
      {
        SetError(ex);
        return null;
      }
    }

    public async Task<List<RegionViewModel>> GetRegions(string lang)
    {
      try
      {
        return await Context.Regions
            .Select(r => new RegionViewModel

            {
              RegionId = r.RegionId,
              Description = (lang == "et") ? r.Description : r.DescriptionEnglish
            })
            .ToListAsync();
      }
      catch (Exception ex)
      {
        SetError(ex);
        return null;
      }
    }
  }
}

namespace CUSTOR.EICOnline.DAL
{
  public class ZoneRepository : EFRepository<ApplicationDbContext, Zone>
  {
    public ZoneRepository(ApplicationDbContext context) : base(context)
    { }

    public async Task<List<Zone>> GetZones(object rId)
    {
      try
      {
        string id = rId.ToString();
        IQueryable<Zone> zones = Context.Zones;
        int i = zones.Where(x => x.RegionId == id).Count();
        return await zones.Where(x => x.RegionId == id).ToListAsync();
        //string id = rId.ToString();
        //return await Context.Zones
        //    .Where(r => r.RegionId == id)
        //    .Select(z => new ZoneViewModel

        //    {
        //        ZoneId = z.ZoneId,
        //        RegionId = z.RegionId,
        //        DescriptionEnglish = z.DescriptionEnglish,
        //        Description = z.Description
        //    })
        //    .ToListAsync();
      }
      catch (Exception ex)
      {
        SetError(ex);
        return null;
      }
    }

    public async Task<List<ZoneViewModel>> GetAllZones(string lang)
    {
      try
      {
        //IQueryable<Zone> zones = Context.Zones;
        //int i = zones.Where(x => x.RegionId == id).Count();
        //return await zones.Where(x => x.RegionId == id).ToListAsync();
        ////string id = rId.ToString();
        return await Context.Zones
            .Select(z => new ZoneViewModel

            {
              ZoneId = z.ZoneId,
              RegionId = z.RegionId,
              //DescriptionEnglish = z.DescriptionEnglish,
              Description = (lang == "et") ? z.Description : z.DescriptionEnglish
            })
            .ToListAsync();
      }
      catch (Exception ex)
      {
        SetError(ex);
        return null;
      }
    }
  }
}

namespace CUSTOR.EICOnline.DAL
{
  public class WoredaRepository : EFRepository<ApplicationDbContext, Woreda>
  {
    public WoredaRepository(ApplicationDbContext context) : base(context)
    { }

    public async Task<List<WoredaViewModel>> GetWoredas(object zId)
    {
      try
      {
        //IQueryable<Woreda> woredas = Context.Woredas;
        //return await woredas.ToListAsync();
        string id = zId.ToString();
        return await Context.Woredas
            .Where(zn => zn.ZoneId == id)
            .Select(w => new WoredaViewModel()
            {
              ZoneId = w.ZoneId,
              WoredaId = w.WoredaId,
              //DescriptionEnglish = w.DescriptionEnglish,
              Description = w.Description
            })
            .ToListAsync();
      }
      catch (Exception ex)
      {
        SetError(ex);
        return null;
      }
    }

    public async Task<List<WoredaViewModel>> GetAllWoredas(string lang)
    {
      try
      {
        return await Context.Woredas
            .Select(w => new WoredaViewModel

            {
              ZoneId = w.ZoneId,
              WoredaId = w.WoredaId,
              //DescriptionEnglish = w.DescriptionEnglish,
              Description = (lang == "et") ? w.Description : w.DescriptionEnglish
            })
            .ToListAsync();
      }
      catch (Exception ex)
      {
        SetError(ex);
        return null;
      }
    }
  }
}

namespace CUSTOR.EICOnline.DAL
{
  public class KebeleRepository : EFRepository<ApplicationDbContext, Kebele>
  {
    public KebeleRepository(ApplicationDbContext context) : base(context)
    { }

    public async Task<List<KebeleViewModel>> GetKebele(object wrdId)
    {
      //KebeleViewModel used to list required fields only.
      try
      {
        //IQueryable<Kebele> ViewModel = Context.ViewModel;
        //return await ViewModel.ToListAsync();
        string id = wrdId.ToString();
        return await Context.Kebeles
            .Where(wrd => wrd.WoredaId == id)
            .Select(k => new KebeleViewModel()
            {
              WoredaId = k.WoredaId,
              KebeleId = k.KebeleId,
              //DescriptionEnglish = k.DescriptionEnglish,
              Description = k.Description
            })
            .ToListAsync();
      }
      catch (Exception ex)
      {
        SetError(ex);
        return null;
      }
    }

    public async Task<List<KebeleViewModel>> GetAllKebeles(string lang)
    {
      try
      {
        return await Context.Kebeles
            .Select(k => new KebeleViewModel

            {
              WoredaId = k.WoredaId,
              KebeleId = k.KebeleId,
              //DescriptionEnglish = k.DescriptionEnglish,
              Description = (lang == "et") ? k.Description : k.DescriptionEnglish
            })
            .ToListAsync();
      }
      catch (Exception ex)
      {
        SetError(ex);
        return null;
      }
    }

    public async Task<List<KebeleViewModel>> GetAllKebelesBYWoredaId(string lang)
    {
      try
      {
        return await Context.Kebeles
            .Select(k => new KebeleViewModel

            {
              WoredaId = k.WoredaId,
              KebeleId = k.KebeleId,
              Description = (lang == "et") ? k.Description : k.DescriptionEnglish
            })
            .ToListAsync();
      }
      catch (Exception ex)
      {
        SetError(ex);
        return null;
      }
    }
  }
}