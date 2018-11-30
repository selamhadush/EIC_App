using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL;
using CUSTOR.EICOnline.DAL.EntityLayer;
using EIC.Investment.API.ViewModels.Dto;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EIC.Investment.API.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [Route("api/Projects")]
    public class ProjectsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ProjectRepository _projectRepository;

        public ProjectsController(ApplicationDbContext context, ProjectRepository projectRepository)
        {
            _context = context;
            _projectRepository = projectRepository;
        }

        // GET: api/Projects
        [HttpGet]
        public IEnumerable<Project> GetProjectAsync()
        {
            var project = _context.Project.Include(s => s.Investor).Include(s => s.ServiceApplication)
                .ThenInclude(p => p.ServiceWorkflow).ThenInclude(p => p.Service)
                .AsEnumerable()
                .OrderByDescending(p => p.ProjectId);
            return project;
        }

        [HttpGet("Detail/{id}")]
        public Project GetProjectDetail([FromRoute] int id)
        {
            var project = _context.Project.Where(p => p.ProjectId == id).Include(p => p.ProjectCost)
                .Include(p => p.ProjectEmployment).Include(p => p.ProjectNationalityComposition)
                .Include(p => p.ProjectOutput).Include(p => p.ProjectRequirement).Include(p => p.ProjectInput)
                .FirstOrDefault();
            return project;
        }


        [HttpGet("GetProjectStatus/{id}")]
        public int GetProjectStatus([FromRoute] int id)
        {
            var projectStatus = _context.Project.Where(p => p.ProjectId == id).Select(p => p.ProjectStatus)
                .FirstOrDefault();
            return projectStatus;
        }

        [HttpGet("ByInvestorId/{id}")]
        public IEnumerable<Project> GetServiceApplicationByInvestorId([FromRoute] int id)
        {
            var project = _context.Project
                .Where(s => s.InvestorId == id && s.IsActive == true && s.IsDeleted == false)
                .Include(p => p.InvestmentActivity)
                .AsEnumerable();

            return project;
        }

        [HttpGet("list")]
        public IEnumerable<Project> GetProjects()
        {
            var project = _context.Project
                .AsEnumerable();
            return project;
        }

        [HttpGet("ProjectOnlyByInvestorId/{id}")]
        public IEnumerable<Project> GetProjectOnly([FromRoute] int id)
        {
            var project = _context.Project
                .Where(p => p.ProjectStatus != 1 && p.IsActive == true && p.InvestorId == id)
                .AsEnumerable();
            return project;
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<Project> GetProject([FromRoute] int id)
        {
            var project = await _projectRepository.getProjectDetial(id);
            return project;
        }

        // PUT: api/Projects/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject([FromRoute] int id, [FromBody] Project project)
        {
            var editedProject = project;
            editedProject.ProjectId = id;
            editedProject.ParentProjectId = 0;
            editedProject.ProjectNameSort = "sort x";
            editedProject.ProjectNameSoundX = "sound xxx";
            editedProject.IsActive = false;
            editedProject.IsDeleted = false;
            editedProject.EventDatetime = DateTime.Now;
            editedProject.StartDate = DateTime.Now;
            editedProject.CreatedUserId = 1;
            editedProject.SiteId = 3;

            //_context.Project.Add(editedProject);

            _context.Entry(editedProject).State = EntityState.Modified;

            //_context.Entry(editedProjectCost).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
                    return NotFound();
                throw;
            }

            return CreatedAtAction("GetProject", editedProject);
        }

        [HttpPost("Api/Search")]
        public IActionResult SearchProject([FromBody] SearchDto searchDto)
        {
            object serviceApplications = null;


            if (searchDto.ServiceId.HasValue && searchDto.status.HasValue && searchDto.SpecDate.HasValue)
                serviceApplications = _context.ServiceApplication
                    .Include(s => s.Project)
                    .Include(s => s.ServiceWorkflow)
                    .Include(se => se.Service)
                    .Include(pre => pre.Investor).Where(m => m.ServiceId == searchDto.ServiceId &&
                                                             m.CurrentStatusId == searchDto.status &&
                                                             m.StartDate == searchDto.SpecDate).AsEnumerable();
            else if (searchDto.ServiceId.HasValue && searchDto.status.HasValue)
                serviceApplications = _context.ServiceApplication
                    .Include(s => s.Project)
                    .Include(s => s.ServiceWorkflow)
                    .Include(se => se.Service)
                    .Include(pre => pre.Investor).Where(
                        m => m.ServiceId == searchDto.ServiceId &&
                             m.CurrentStatusId == searchDto.status).AsEnumerable();
            else if (searchDto.ServiceId.HasValue)
                serviceApplications = _context.ServiceApplication.Include(p => p.Project).Where(
                    m => m.ServiceId == searchDto.ServiceId).AsEnumerable();
            else if (searchDto.status.HasValue)
                serviceApplications = _context.ServiceApplication
                    .Include(s => s.Project)
                    .Include(s => s.ServiceWorkflow)
                    .Include(se => se.Service)
                    .Include(pre => pre.Investor).Where(
                        m => m.CurrentStatusId == searchDto.status).AsEnumerable();
            else
                serviceApplications = _context.ServiceApplication
                    .Include(s => s.Project)
                    .Include(s => s.ServiceWorkflow)
                    .Include(se => se.Service)
                    .Include(pre => pre.Investor);

            return Ok(serviceApplications);
        }


        // POST: api/Projects
        [HttpPost]
        public async Task<IActionResult> PostProject([FromBody] Project project)
        {
            var investor = _context.Investors.FirstOrDefault(inv => inv.InvestorId == project.InvestorId);

            var service = _context.Service.FirstOrDefault(inv => inv.ServiceId == project.ServiceId);

            var squence = _context.Squences.FirstOrDefault();
            var lastSe = squence.LastSquence + 1;

            var perminumber = lastSe.ToString();
            var editedProject = project;
            //editedProject.InvestorId = 1018;
            //editedProject.ParentProjectId = 1;
            editedProject.ProjectNameSort = "sort x";
            editedProject.ProjectNameSoundX = "sound xxx";
            editedProject.IsActive = false;
            editedProject.IsDeleted = false;
            editedProject.EventDatetime = DateTime.Now;
            editedProject.StartDate = DateTime.Now;
            editedProject.CreatedUserId = 1;
            editedProject.ProjectStatus = 9;
            editedProject.ProjectStage = 1;
            editedProject.SiteId = 3;
            editedProject.InvestmentPermitNo = perminumber;

            var serviceApplication = new ServiceApplication
            {
                InvestorId = project.InvestorId,
                CaseNumber = perminumber,
                ServiceId = project.ServiceId,
                CurrentStatusId = 44450,
                IsSelfService = true,
                IsPaid = true,
                StartDate = DateTime.Now,
                CreatedUserId = 1,
                IsActive = false,
                CreatedUserName = editedProject.CreatedUserName,
                InvestorNameAmharic = investor.InvestorName,
                InvestorNameEnglish = investor.InvestorNameEng,
                ServiceNameAmharic = service.DisplayName,
                ServiceNameEnglish = service.DisplayNameEnglish,
                ProjectNameEnglish = project.ProjectName,
                ProjectNameAmharic = project.ProjectName
            };

            var serviceWorkflow = new ServiceWorkflow
            {
                StepId = 9,
                ActionId = 3,
                FromStatusId = 3,
                ToStatusId = 5,
                PerformedByRoleId = 1,
                NextStepId = 13,
                GenerateEmail = true,
                GenerateLetter = true,
                IsDocumentRequired = true,
                ServiceId = project.ServiceId,
                LegalStatusId = 3,
                CreatedUserId = 1,
                IsActive = false
            };

            squence.LastSquence = lastSe;
            _context.Entry(squence).State = EntityState.Modified;

            serviceApplication.ServiceWorkflow.Add(serviceWorkflow);
            project.ServiceApplication.Add(serviceApplication);
            _context.Project.Add(editedProject);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProject", new {id = project.ProjectId}, editedProject);
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var project = _context.Project.Include(p => p.ProjectCost).Include(p => p.ProjectEmployment)
                .Include(p => p.ProjectNationalityComposition).Include(p => p.ProjectOutput)
                .Include(p => p.ProjectRequirement).Include(p => p.ProjectInput).Single(m => m.ProjectId == id);

            project.ProjectCost.Clear();
            project.ProjectEmployment.Clear();
            project.ProjectNationalityComposition.Clear();
            project.ProjectOutput.Clear();
            project.ProjectRequirement.Clear();
            project.ProjectInput.Clear();

            _context.SaveChanges();

            if (project == null) return NotFound();

            _context.Project.Remove(project);
            await _context.SaveChangesAsync();

            return Ok(project);
        }


        [HttpGet("approveProject/{id}")]
        public async Task<IActionResult> ApproveProject([FromRoute] int id)
        {
            var project = _context.Project.First(s => s.ProjectId == id);


            if (project == null)
            {
                return NotFound();
            }

            project.ProjectStatus = 2;
            project.IsActive = true;
            _context.Entry(project).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(project);
        }

        private bool ProjectExists(int id)
        {
            return _context.Project.Any(e => e.ProjectId == id);
        }

        [HttpGet("ProjectDetail/{id}")]
        public async Task<Project> GetProjectDetails([FromRoute] int id)
        {
            return await _projectRepository.GetProjectDetails();
        }
    }
}