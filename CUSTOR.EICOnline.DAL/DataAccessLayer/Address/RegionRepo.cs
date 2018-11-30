using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL.DataAccessLayer.Address
{
    public class RegionRepo : EFRepository<ApplicationDbContext, Region>
    {
        public RegionRepo(ApplicationDbContext context) : base(context)
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
        //public async Task<List<RegionViewModel>> GetRegion(string Id)
        //{
        //    try
        //    {
        //        return await Context.Regions
        //            .Select(r => new RegionViewModel
        //            {
        //                RegionId = r.RegionId,
        //                Description = r.Description,
        //                DescriptionEnglish = r.DescriptionEnglish
        //            })
        //            .ToListAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        SetError(ex);
        //        return null;
        //    }
        //}
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

        public async Task<Region> GetRegionsById(string Id)
        {
            try
            {
                return await Context.Regions.
                   Where(r=>r.RegionId==Id) 
                   .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                SetError(ex);
                return null;
            }
        }
     public async Task<bool> DeleteRegion(string id)
        {

            var Region = await Context.Regions
                .FirstOrDefaultAsync(region => region.RegionId == id);
            if (Region == null)
            {
                SetError("Region does not exist");
                return false;
            }
            Context.Regions.Remove(Region);
            return await SaveAsync();

        }
    }
}