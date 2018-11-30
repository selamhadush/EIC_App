using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL
{
  public class SiteRepository : EFRepository<ApplicationDbContext, Site>
  {
    public SiteRepository(ApplicationDbContext context) : base(context)
    { }

    public async Task<List<Site>> GetSites(int page = 0, int pageSize = 15)
    {
      IQueryable<Site> sites = Context.Site
                           .OrderBy(site => site.SiteId);
      if (page > 0)
      {
        sites = sites
        .Skip((page - 1) * pageSize)
        .Take(pageSize);
      }

      return await sites.ToListAsync();
    }

    public Site GetSite(object SiteId)
    {
      Site sites = null;
      try
      {
        int id = (int)SiteId;
        sites = Context.Site
                               .Where(sit => sit.SiteId == id).FirstOrDefault();
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load Site - invalid Site id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }
      return sites;
    }

    public async Task<bool> DeleteSite(int id)
    {
      var Site = await Context.Site
          .FirstOrDefaultAsync(sites => sites.SiteId == id);
      if (Site == null)
      {
        SetError("Site does not exist");
        return false;
      }
      Context.Site.Remove(Site);
      return await SaveAsync();
    }
  }
}