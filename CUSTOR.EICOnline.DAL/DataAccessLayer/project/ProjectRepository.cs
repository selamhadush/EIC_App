using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL
{
  public class ProjectRepository : EFRepository<ApplicationDbContext, Project>
  {
    public ProjectRepository(ApplicationDbContext context) : base(context)
    { }

    public async Task<List<ProjectLookUp>> GetProject()
    {
      try
      {
        return await Context.Project.Select(
          p => new ProjectLookUp
          {
            ProjectName = p.ProjectName,
            ProjectDescription = p.ProjectDescription,
            OperationDate = p.OperationDate,
            InvestorId = p.InvestorId,
            StartDate = p.StartDate,
            TerminationDate = p.TerminationDate
          })
            .ToListAsync();
      }
      catch (Exception ex)
      {
        SetError(ex);
        return null;
      }
    }

    public async Task<IEnumerable<Project>> getAllProjectDetail()
    {
      try
      {
        return await Context.Project.Include(p => p.ProjectCost).
          Include(p => p.ProjectEmployment)
          .Include(p => p.ProjectNationalityComposition).
          Include(p => p.ProjectOutput)
          .Include(p => p.ProjectRequirement).Include(p => p.ProjectInput).Include(p => p.ServiceApplication)
          .ThenInclude(s => s.ServiceWorkflow)
          .ToListAsync();
      }
      catch (Exception ex)
      {
        SetError(ex);
        return null;
      }
    }

    public async Task<Project> getProjectDetial(int id)
    {
      try
      {
        return await Context.Project.

          Include(p => p.ServiceApplication)
          .ThenInclude(s => s.ServiceWorkflow).
          SingleOrDefaultAsync(m => m.ProjectId == id);
      }
      catch (Exception ex)
      {
        SetError(ex);
        return null;
      }
    }

    public async Task<Project> GetProjectDetails()
    {
      try
      {
        return await Context.Project.
            Include(i => i.Investor).
            Include(ia => ia.InvestmentActivity).FirstAsync();
        //  .Select(
        //p => new ProjectDetailsModel
        //{
        //    FullName = i.FirstNameEng + ' ' + i.FatherNameEng + ' ' + i.GrandNameEng,
        //    StartDate = p.StartDate,
        //    InvestmentPermitNo = p.InvestmentPermitNo,
        //    ExemptionYear = ia.ExemptionYear,
        //    InvActivity = ia.EnglishDescription
        //})

      }
      catch (Exception ex)
      {
        SetError(ex);
        return null;
      }
    }

  }
}