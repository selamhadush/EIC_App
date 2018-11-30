using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL.EntityLayer;
using EIC.Investment.API.ViewModels.Dto;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EIC.Investment.API.Controllers
{
    [Produces("application/json")]
    [Route("api/ServiceApplications")]
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    public class ServiceApplicationsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ServiceApplicationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ServiceApplications
        [HttpGet]
        public IEnumerable<ServiceApplication> GetServiceApplication()
        {
            return _context.ServiceApplication
                .Include(s => s.ServiceWorkflow)
                .OrderByDescending(s => s.ServiceApplicationId)
                .Where(s => s.CurrentStatusId == 44446).ToList();

            //.Include(In => In.Investor);
        }

        [HttpGet("{id}")]
        public async Task<ServiceApplication> GetServiceApplication([FromRoute] int id)
        {
            var serviceApplication = await _context.ServiceApplication
                .Include(s => s.Document)
                .Include(s => s.Service)
                .ThenInclude(s => s.ServiceTariff)
                .ThenInclude(s => s.Tariff)
                .SingleOrDefaultAsync(m => m.ServiceApplicationId == id);
            return serviceApplication;
        }

        [HttpGet("ServiceApplicationWithRenewal/{id}")]
        public async Task<ServiceApplication> GetServiceApplicationWithRenewal([FromRoute] int id)
        {
            var serviceApplication = await _context.ServiceApplication
                .Include(pre => pre.ProjectRenewal)
                .SingleOrDefaultAsync(m => m.ServiceApplicationId == id);
            return serviceApplication;
        }


        [HttpGet("ServiceApplicationBillOfMaterial/{id}")]
        public async Task<ServiceApplication> GetServiceApplicationBillOfMaterial([FromRoute] int id)
        {
            var serviceApplication = await _context.ServiceApplication
                .Include(pre => pre.IncentiveBoMRequestItem)
                .SingleOrDefaultAsync(m => m.ServiceApplicationId == id);
            return serviceApplication;
        }

        [HttpGet("ServiceApplicationCancellation/{id}")]
        public async Task<ServiceApplication> GetServiceApplicationWithCancellation([FromRoute] int id)
        {
            var serviceApplication = await _context.ServiceApplication
                .Include(pre => pre.ProjectCancellation)
                .SingleOrDefaultAsync(m => m.ServiceApplicationId == id);
            return serviceApplication;
        }

        [HttpGet("ServiceApplicationSubstitute/{id}")]
        public async Task<ServiceApplication> GetServiceApplicationWithSubstitute([FromRoute] int id)
        {
            var serviceApplication = await _context.ServiceApplication
                .Include(pre => pre.ProjectSubstitute)
                .SingleOrDefaultAsync(m => m.ServiceApplicationId == id);
            return serviceApplication;
        }

        [HttpGet("ByInvestorId/{id}")]
        public IEnumerable<ServiceApplication> GetServiceApplicationByInvestorId([FromRoute] int id)
        {
            var project = _context.ServiceApplication
                .Where(s => s.InvestorId == id)
                .Include(p => p.ServiceWorkflow)
                .AsEnumerable()
                .OrderByDescending(s => s.ServiceApplicationId);
            return project;
        }

        [HttpGet("ByOfficerId/{officerId}")]
        public IEnumerable<ServiceApplication> GetServiceApplicationByOfficerId([FromRoute] string officerId)
        {
            var project = _context.ServiceApplication
                .Where(t => t.TodoTask.AssignedUserId == officerId)
                .Include(s => s.ServiceWorkflow)
                .AsEnumerable()
                .OrderByDescending(s => s.ServiceApplicationId);
            return project;
        }


        [HttpGet("finalForApproval/{id}")]
        public async Task<IActionResult> GetServiceApplicationAndFinalizeAsync([FromRoute] int id)
        {
            var serviceApplication =
                _context.ServiceApplication.First(p => p.ServiceApplicationId == id);
            serviceApplication.IsActive = true;
            serviceApplication.EndDate = DateTime.Now;
            serviceApplication.CurrentStatusId = 44446;
            _context.Entry(serviceApplication).State = EntityState.Modified;

            var serviceWorkflowHistory = new ServiceWorkflowHistory();
            serviceWorkflowHistory.ActionId = 3;
            serviceWorkflowHistory.StepId = 8;
            serviceWorkflowHistory.FromStatusId = 3;
            serviceWorkflowHistory.ToStatusId = 3;
            serviceWorkflowHistory.PerformedByRoleId = 3;
            serviceWorkflowHistory.NextStepId = 9;
            serviceWorkflowHistory.ServiceId = 13;
            serviceWorkflowHistory.LegalStatusId = 3;
            serviceWorkflowHistory.CreatedUserId = 1;
            serviceWorkflowHistory.IsActive = true;
            serviceWorkflowHistory.ServiceApplicationId = id;
            _context.ServiceWorkflowHistories.Add(serviceWorkflowHistory);
            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetServiceApplication", serviceApplication);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceApplicationExists(id))
                    return NotFound();
                throw;
            }
        }


        [HttpPost("ChangeApplicationStatus/{id}")]
        public async Task<IActionResult> ChangeApplicationStatus([FromRoute] int id, [FromBody] Lookup lookup)
        {
            var serviceApplication =
                _context.ServiceApplication.First(p => p.ServiceApplicationId == id);
            serviceApplication.IsActive = true;
            serviceApplication.CurrentStatusId = Convert.ToInt32(lookup.Code);
            _context.Entry(serviceApplication).State = EntityState.Modified;
            if (lookup.Code == "44449")
            {
                var project = _context.Project.First(p => p.ProjectId == serviceApplication.ProjectId);
                project.IsActive = true;
                _context.Entry(project).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetServiceApplication", serviceApplication);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceApplicationExists(id))
                    return NotFound();
                throw;
            }
        }


        // PUT: api/ServiceApplications/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServiceApplication([FromRoute] int id,
            [FromBody] ServiceApplication serviceApplication)
        {
            //if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}

            var serviceApplicationEdited = serviceApplication;
            serviceApplicationEdited.IsActive = true;

            if (id != serviceApplicationEdited.ServiceApplicationId) return BadRequest();

            _context.Entry(serviceApplicationEdited).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceApplicationExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/ServiceApplications
        [HttpPost]
        public async Task<IActionResult> PostServiceApplication([FromBody] ServiceApplication serviceApplication)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var investor =
                _context.Investors.FirstOrDefault(inv => inv.InvestorId == serviceApplication.InvestorId);

            var service = _context.Service.FirstOrDefault(inv => inv.ServiceId == serviceApplication.ServiceId);

            var project = _context.Project.FirstOrDefault(inv => inv.ProjectId == serviceApplication.ProjectId);

            var squence = _context.Squences.FirstOrDefault();
            var lastSe = squence.LastSquence + 1;

            var perminumber = lastSe.ToString();


            var editServiceApplication = new ServiceApplication
            {
                InvestorId = serviceApplication.InvestorId,
                CaseNumber = perminumber,
                ProjectId = serviceApplication.ProjectId,
                ServiceId = serviceApplication.ServiceId,
                CurrentStatusId = 44450,
                IsSelfService = true,
                IsPaid = true,
                StartDate = DateTime.Now,
                CreatedUserId = 1,
                IsActive = false,
                CreatedUserName = serviceApplication.CreatedUserName,
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
                NextStepId = 1015,
                GenerateEmail = true,
                GenerateLetter = true,
                IsDocumentRequired = true,
                ServiceId = serviceApplication.ServiceId,
                LegalStatusId = 3,
                CreatedUserId = 1,
                IsActive = false
            };

            editServiceApplication.ServiceWorkflow.Add(serviceWorkflow);
            _context.ServiceApplication.Add(editServiceApplication);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetServiceApplication", new {id = serviceApplication.ServiceApplicationId},
                editServiceApplication);
        }


        [HttpPost("ApplicationStart")]
        public async Task<IActionResult> PostServiceApplicationOfficer([FromBody] ServiceApplication serviceApplication)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var editeTodoTask = serviceApplication.TodoTask;
            editeTodoTask.IsActive = false;


            var investor =
                _context.Investors.FirstOrDefault(inv => inv.InvestorId == serviceApplication.InvestorId);

            var service = _context.Service.FirstOrDefault(inv => inv.ServiceId == serviceApplication.ServiceId);

            var project = _context.Project.FirstOrDefault(inv => inv.ProjectId == serviceApplication.ProjectId);

            var squence = _context.Squences.FirstOrDefault();
            var lastSe = squence.LastSquence + 1;

            var perminumber = lastSe.ToString();


            var editServiceApplication = new ServiceApplication
            {
                InvestorId = serviceApplication.InvestorId,
                CaseNumber = perminumber,
                ServiceId = serviceApplication.ServiceId,
                CurrentStatusId = 44450,
                IsSelfService = true,
                IsPaid = true,
                StartDate = DateTime.Now,
                CreatedUserId = 1,
                IsActive = false,
                CreatedUserName = serviceApplication.CreatedUserName,
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
                NextStepId = 1015,
                GenerateEmail = true,
                GenerateLetter = true,
                IsDocumentRequired = true,
                ServiceId = serviceApplication.ServiceId,
                LegalStatusId = 3,
                CreatedUserId = 1,
                IsActive = false
            };
            editServiceApplication.ServiceWorkflow.Add(serviceWorkflow);
            editServiceApplication.TodoTask = editeTodoTask;
            _context.ServiceApplication.Add(editServiceApplication);
            editeTodoTask.ServiceApplication.Add(editServiceApplication);
            _context.TodoTask.Add(editeTodoTask);

            await _context.SaveChangesAsync();


            return CreatedAtAction("GetServiceApplication", new {id = serviceApplication.ServiceApplicationId},
                editServiceApplication);
        }


        [HttpPost("Api/Search")]
        public IActionResult SearchProject([FromBody] SearchDto searchDto)
        {
            object serviceApplications = null;

            //var serviceApplications = _context.ServiceApplication.
            //Include(p => p.Project).
            //Where(
            //  m => m.ServiceId == searchDto.ServiceId &&
            //  m.IsActive == searchDto.status

            //).
            //AsEnumerable();

            if (searchDto.ServiceId.HasValue && searchDto.status.HasValue && searchDto.SpecDate.HasValue)
                serviceApplications = _context.ServiceApplication
                    .Include(s => s.ServiceWorkflow)
                    .Where(m => m.ServiceId == searchDto.ServiceId &&
                                m.CurrentStatusId == searchDto.status &&
                                m.StartDate == searchDto.SpecDate).AsEnumerable();
            else if (searchDto.ServiceId.HasValue && searchDto.status.HasValue)
                serviceApplications = _context.ServiceApplication
                    .Include(s => s.ServiceWorkflow)
                    .Where(m => m.ServiceId == searchDto.ServiceId &&
                                m.CurrentStatusId == searchDto.status).AsEnumerable();
            else if (searchDto.ServiceId.HasValue)
                serviceApplications = _context.ServiceApplication
                    .Include(s => s.ServiceWorkflow)
                    .Where(
                        m => m.ServiceId == searchDto.ServiceId).AsEnumerable();
            else if (searchDto.status.HasValue)
                serviceApplications = _context.ServiceApplication
                    .Include(s => s.ServiceWorkflow)
                    .Where(m => m.CurrentStatusId == searchDto.status).AsEnumerable();
            else
                serviceApplications = _context.ServiceApplication
                    .Include(s => s.ServiceWorkflow);

            return Ok(serviceApplications);
        }

        // DELETE: api/ServiceApplications/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiceApplication([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var serviceApplication =
                await _context.ServiceApplication.SingleOrDefaultAsync(m => m.ServiceApplicationId == id);
            if (serviceApplication == null) return NotFound();

            _context.ServiceApplication.Remove(serviceApplication);
            await _context.SaveChangesAsync();

            return Ok(serviceApplication);
        }


        [HttpGet("submitedForApproval/{id}")]
        public async Task<IActionResult> ApproveApplication([FromRoute] int id)
        {
            var application = _context.ServiceApplication.First(s => s.ServiceApplicationId == id);


            if (application == null)
            {
                return NotFound();
            }

            application.IsActive = true;
            _context.Entry(application).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return Ok(application);
        }


        [HttpGet("ApplicationGroupByServiceId")]
        public IEnumerable<ServiceGroup> Result()
        {
            var serviceGroup = new List<ServiceGroup>();

            var services = _context.Service.Where(c => c.IsActive == true && c.TypeOfService == "0")
                .ToList();
            foreach (var service in services)
            {
                var status = new ServiceGroup();
                IEnumerable<series> ip = _context.Query<series>()
                    .FromSql("sp_get_application_group_by_current_statusId @p0", service.ServiceId)
                    .ToList();
                status.name = service.Abbreviation;
                status.series = ip;
                serviceGroup.Add(status);
            }

            return serviceGroup;
        }


        [HttpGet("ProjectGroupByStage")]
        public IEnumerable<ServiceGroup> AllProjectStatusBySector()
        {
            var serviceGroup = new List<ServiceGroup>();

            var sectors = _context.Sector
                .ToList();
            foreach (var sector in sectors)
            {
                var status = new ServiceGroup();
                IEnumerable<series> series = _context.Query<series>()
                    .FromSql("sp_get_project_group_by_current_statusId @p0", sector.SectorId)
                    .ToList();
                status.name = sector.DescriptionEnglishAlias;
                status.series = series;
                serviceGroup.Add(status);
            }

            return serviceGroup;
        }


        [HttpGet("ProjectGroupByEconomicSector")]
        public IEnumerable<series> AllProjectByEconomicSector()
        {
            IEnumerable<series> series = _context.Query<series>().FromSql("sp_get_all_project_group_by_economic_sector")
                .ToList();

            return series;
        }

        [HttpGet("AllProjectByProjectStage")]
        public IEnumerable<series> AllProjectByProjectStage()
        {
            IEnumerable<series> series = _context.Query<series>().FromSql("sp_get_all_project_group_by_project_stage")
                .ToList();
            return series;
        }


        [HttpGet("ServiceApplicationWithInvestor/{id}")]
        public async Task<ServiceApplication> GetServiceApplicationWithInvestor([FromRoute] int id)
        {
            var serviceApplication = await _context.ServiceApplication
                .Include(pre => pre.Investor)
                .SingleOrDefaultAsync(m => m.ServiceApplicationId == id);
            return serviceApplication;
        }

        private bool ServiceApplicationExists(int id)
        {
            return _context.ServiceApplication.Any(e => e.ServiceApplicationId == id);
        }
    }
}