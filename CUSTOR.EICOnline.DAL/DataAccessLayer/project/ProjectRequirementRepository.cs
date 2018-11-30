using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL
{
  public class ProjectRequirementRepository : EFRepository<ApplicationDbContext, ProjectRequirement>
  {
    public ProjectRequirementRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<List<ProjectRequirement>> getPrerequisite(string lang, int id)
    {
      //KebeleViewModel used to list required fields only.
      try
      {
        return await Context.ProjectRequirement
            .Where(pr => pr.ProjectRequirementId == id)
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