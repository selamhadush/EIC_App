using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL.DataAccessLayer.Address
{
    public class ZoneRepo : EFRepository<ApplicationDbContext, Zone>
    {
        public ZoneRepo(ApplicationDbContext context) : base(context)
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
        public async Task<List<Zone>> GetZones(int page = 0, int pageSize = 15)
        {

            IQueryable<Zone> zones = Context.Zones
                      .Include(r => r.Region)
                       .OrderBy(zo => zo.ZoneId);
            if (page > 0)
            {
                zones = zones
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
            }

            return await zones.ToListAsync();
        }
        public Zone GetZone(object rId)
        {
            Zone zone = null;
            try
            {
                string id = rId.ToString();
                zone = Context.Zones
                               .Include(r => r.Region)
                           .Where(x => x.ZoneId == id).FirstOrDefault();
            }
            catch (Exception ex)
            {
                SetError(ex);
                return null;
            }
            return zone;
        }
        public async Task<bool> DeleteZone(string id)
        {

            var Zone = await Context.Zones
                .FirstOrDefaultAsync(zo => zo.ZoneId == id);
            if (Zone == null)
            {
                SetError("Zone does not exist");
                return false;
            }
            Context.Zones.Remove(Zone);
            return await SaveAsync();

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