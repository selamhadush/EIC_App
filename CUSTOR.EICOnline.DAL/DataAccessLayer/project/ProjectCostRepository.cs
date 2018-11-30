using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL
{
  public class ProjectCostRepository : EFRepository<ApplicationDbContext, ProjectCost>
  {
    public ProjectCostRepository(ApplicationDbContext context) : base(context)
    { }

    public async Task<List<ProjectCost>> GetAllProjectCost()
    {
      try
      {
        IQueryable<ProjectCost> ProjectCost = Context.ProjectCost;
        return await ProjectCost.ToListAsync();
      }
      catch (Exception ex)
      {
        SetError(ex);
        return null;
      }
    }
  }
}