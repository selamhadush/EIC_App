using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using OfficeOpenXml;
using EIC.Investment.API.ViewModels;
using CUSTOR.EICOnline.DAL.DataAccessLayer.Incentive;
using CUSTOR.API.ExceptionFilter;
using Microsoft.AspNetCore.Cors;

namespace CUSTOR.EICOnline.API.Controllers.Incentive
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class IncentiveBoMRequestItemsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IncentiveBoMRequestItemsRepository _itemsRepository;
        private readonly IHostingEnvironment _hostingEnvironment;
       

        public IncentiveBoMRequestItemsController(IHostingEnvironment hostingEnvironment,
          ApplicationDbContext context,
          IncentiveBoMRequestItemsRepository incentiveBoMRequestItemsRepository
          )
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
            _itemsRepository = incentiveBoMRequestItemsRepository;
        }

        //GET: api/IncentiveBoMRequestItems
        [HttpGet]
        public IEnumerable<IncentiveBoMRequestItem> GetIncentiveBoMRequestItem()
        {
            return _itemsRepository.GetAll();
        }
        [HttpGet("{projectId}/{incentiveCategoryId}")]
        public async Task<IEnumerable<IncentiveBoMRequestItem>> GetIncentiveBoMRequestItems(int projectId, int incentiveCategoryId)
        {
            // to-do return required fields only
            return await _itemsRepository.GetAllItems(projectId, incentiveCategoryId);
        }
        [HttpGet("finalForApproval/{id}")]
        public async Task<IActionResult> GetBillOfmaterialAndFinalizeAsync([FromRoute] int id)
        {
            IncentiveBoMRequestItem incentiveBoMRequestItem = _context.IncentiveBoMRequestItem.First(p => p.IncentiveBoMRequestItemId == id);

            if (incentiveBoMRequestItem.IsApproved)
            {
                incentiveBoMRequestItem.IsApproved = false;

                _context.Entry(incentiveBoMRequestItem).State = EntityState.Modified;
            }
            else
            {
                incentiveBoMRequestItem.IsApproved = true;


                _context.Entry(incentiveBoMRequestItem).State = EntityState.Modified;

                ServiceApplication serviceApplication = _context.ServiceApplication.First(p => p.ServiceApplicationId == incentiveBoMRequestItem.ServiceApplicationId);
                serviceApplication.IsActive = true;
                serviceApplication.EndDate = DateTime.Now;
                serviceApplication.CurrentStatusId = 44447;
                _context.Entry(serviceApplication).State = EntityState.Modified;

                ServiceWorkflowHistory serviceWorkflowHistory = new ServiceWorkflowHistory();
                serviceWorkflowHistory.ActionId = 3;
                serviceWorkflowHistory.StepId = 8;
                serviceWorkflowHistory.FromStatusId = 3;
                serviceWorkflowHistory.ToStatusId = 3;
                serviceWorkflowHistory.PerformedByRoleId = 3;
                serviceWorkflowHistory.NextStepId = 9;
                serviceWorkflowHistory.ServiceId = 1040;
                serviceWorkflowHistory.LegalStatusId = 3;
                serviceWorkflowHistory.CreatedUserId = 1;
                serviceWorkflowHistory.IsActive = true;
                serviceWorkflowHistory.ServiceApplicationId = incentiveBoMRequestItem.ServiceApplicationId;
                _context.ServiceWorkflowHistories.Add(serviceWorkflowHistory);
            }
            try
            {
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetIncentiveBoMRequestItem", incentiveBoMRequestItem);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IncentiveBoMRequestItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }


        // GET: api/IncentiveBoMRequestItems/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetIncentiveBoMRequestItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var incentiveBoMRequestItem = await _context.IncentiveBoMRequestItem.SingleOrDefaultAsync(m => m.IncentiveBoMRequestItemId == id);

            if (incentiveBoMRequestItem == null)
            {
                return NotFound();
            }

            return Ok(incentiveBoMRequestItem);
        }

        [HttpGet]
        [Route("ByProjectId/{id:int}")]
        public async Task<IEnumerable<IncentiveBoMRequestItem>> GetIncentiveRequestsByServiceAppId(int id, int page = -1, int pageSize = 10)
        {
            return await _itemsRepository.GetIncentiveBoMRequestItemByProjectId(id, page, pageSize);
        }

        // PUT: api/IncentiveBoMRequestItems/5
        [HttpPut("{id}")]
        public async Task<IncentiveBoMRequestItem> PutIncentiveBoMRequestItem([FromRoute] int id, [FromBody] IncentiveBoMRequestItem incentiveBoMRequestItem)
        {
            //if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}

            //if (id != incentiveBoMRequestItem.IncentiveBoMRequestItemId)
            //{
            //  return BadRequest();
            //}
            if (incentiveBoMRequestItem.RejectionReason != null)
            {
                incentiveBoMRequestItem.IsApproved = false;
            }

            _context.Entry(incentiveBoMRequestItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                //return incentiveBoMRequestItem;
            }
            catch (DbUpdateConcurrencyException)
            {
                //if (!IncentiveBoMRequestItemExists(id))
                //{
                //  return NotFound();
                //}
                //else
                //{
                //  throw;
                //}
            }
            return incentiveBoMRequestItem;

            //return NoContent();
        }

        // POST: api/IncentiveBoMRequestItems
        [HttpPost]
        public async Task<IActionResult> PostIncentiveBoMRequestItem([FromBody] IncentiveBoMRequestItem incentiveBoMRequestItem)
        {
            //if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}



            _context.IncentiveBoMRequestItem.Add(incentiveBoMRequestItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIncentiveBoMRequestItem", new { id = incentiveBoMRequestItem.IncentiveBoMRequestItemId }, incentiveBoMRequestItem);
        }

        // DELETE: api/IncentiveBoMRequestItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncentiveBoMRequestItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var incentiveBoMRequestItem = await _context.IncentiveBoMRequestItem.SingleOrDefaultAsync(m => m.IncentiveBoMRequestItemId == id);
            if (incentiveBoMRequestItem == null)
            {
                return NotFound();
            }

            _context.IncentiveBoMRequestItem.Remove(incentiveBoMRequestItem);
            await _context.SaveChangesAsync();

            return Ok(incentiveBoMRequestItem);
        }

        private bool IncentiveBoMRequestItemExists(int id)
        {
            return _context.IncentiveBoMRequestItem.Any(e => e.IncentiveBoMRequestItemId == id);
        }



        


        [HttpPost]
        [Route("ImportItem")]
        public async Task<IList<IncentiveBoMRequestItem>> PostAsync([FromForm]DocumentVM vm)
        {

            var filePath = Path.Combine(_hostingEnvironment.WebRootPath, vm.Name);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await vm.KeyWords.CopyToAsync(stream);
            }
            string rootFolder = _hostingEnvironment.WebRootPath;
            string fileName = vm.Name;
            FileInfo file = new FileInfo(Path.Combine(rootFolder, fileName));

            using (ExcelPackage package = new ExcelPackage(file))
            {
                ExcelWorksheet workSheet = package.Workbook.Worksheets.First();
                int totalRows = workSheet.Dimension.Rows;

                List<IncentiveBoMRequestItem> incentiveBoMRequestItems = new List<IncentiveBoMRequestItem>();

                for (int i = 2; i <= totalRows; i++)
                {
                    incentiveBoMRequestItems.Add(new IncentiveBoMRequestItem
                    {
                        Description = workSheet.Cells[i, 1].Value.ToString(),
                        HsCode = workSheet.Cells[i, 2].Value.ToString(),
                        Quantity = Convert.ToDecimal(workSheet.Cells[i, 3].Value),
                        ApprovedQuantity = Convert.ToDecimal(workSheet.Cells[i, 3].Value),
                        Balance = Convert.ToDecimal(workSheet.Cells[i, 3].Value),
                        MesurmentUnit = workSheet.Cells[i, 4].Value.ToString(),
                        Phase = 1,
                        IncentiveCategoryId = vm.IncentiveCategoryId,
                        ProjectId = vm.ProjectId,
                        ServiceApplicationId = vm.ServiceApplicationId,

                    });


                    //_context.incentiveBoMRequestItems.Add(postProjectSubstitute);
                }




                //ServiceApplication.Add(serviceApplication);
                _context.IncentiveBoMRequestItem.AddRange(incentiveBoMRequestItems);
                _context.SaveChanges();

                return incentiveBoMRequestItems;
            }
        }
    }
}