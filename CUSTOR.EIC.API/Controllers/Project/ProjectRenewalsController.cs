using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CUSTOR.EICOnline.API.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [Route("api/ProjectRenewals")]
    public class ProjectRenewalsController : Controller
    {
        public ApplicationDbContext context;

        public ProjectRenewalsController(ApplicationDbContext ctx)
        {
            context = ctx;
        }

        [HttpGet]
        public IEnumerable<ProjectRenewal> GetProjectRenewals()
        {
            return context.ProjectRenewal;
        }

        [HttpPost]
        public async Task<IActionResult> PostProject([FromBody] ProjectRenewal projectRenewal)
        {
            //if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}

            var editProjectRenewal = projectRenewal;
            //editProjectRenewal.ServiceApplicationId = projectRenewal.ServiceApplicationId;
            editProjectRenewal.ProjectStatus = 1;
            editProjectRenewal.ApprovedBy = 1;
            editProjectRenewal.SiteId = 3;
            editProjectRenewal.CreatedUserId = 1;
            editProjectRenewal.ApprovedDate = DateTime.Now;

            var serviceApplication = new ServiceApplication();

            serviceApplication.InvestorId = editProjectRenewal.InvestorId;
            serviceApplication.ProjectId = editProjectRenewal.ProjectId;
            serviceApplication.CaseNumber = "1";
            serviceApplication.ServiceId = editProjectRenewal.ServiceId;
            serviceApplication.CurrentStatusId = 44446;
            serviceApplication.IsSelfService = true;
            serviceApplication.IsPaid = true;
            serviceApplication.StartDate = DateTime.Now;
            serviceApplication.CreatedUserId = 1;
            serviceApplication.IsActive = false;

            var serviceWorkflow = new ServiceWorkflow
            {
                StepId = 9,
                ActionId = 3,
                FromStatusId = 3,
                ToStatusId = 5,
                PerformedByRoleId = 1,
                NextStepId = 1015,
                GenerateEmail = true,
                GenerateLetter = true,
                IsDocumentRequired = true,
                ServiceId = editProjectRenewal.ServiceId,
                LegalStatusId = 3,
                CreatedUserId = 1,
                IsActive = false
            };

            serviceApplication.ServiceWorkflow.Add(serviceWorkflow);
            context.ServiceApplication.Add(serviceApplication);
            await context.SaveChangesAsync();
            editProjectRenewal.ServiceApplicationId = serviceApplication.ServiceApplicationId;

            context.ProjectRenewal.Add(editProjectRenewal);

            await context.SaveChangesAsync();

            return CreatedAtAction("GetProjectRenewals", new {id = projectRenewal.ProjectRenewalId}, projectRenewal);
        }
    }
}