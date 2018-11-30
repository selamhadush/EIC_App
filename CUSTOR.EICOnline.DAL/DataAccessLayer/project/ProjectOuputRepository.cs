using System;
using System.Collections.Generic;
using System.Linq;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;

namespace CUSTOR.EICOnline.DAL
{
  public class ProjectOuputRepository : EFRepository<ApplicationDbContext, ProjectOutput>
  {
    public ProjectOuputRepository(ApplicationDbContext context) : base(context)
    {
    }

    public ICollection<ProjectOutput> GetOutPutByProjectId(int projectId)
    {
      ICollection<ProjectOutput> projectOutput = null;
      try
      {
        projectOutput = Context.ProjectOutput
                               .Where(ou => ou.ProjectId == projectId).ToList();
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load Activity - invalid Activity id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }
      return projectOutput;
    }
  }
}