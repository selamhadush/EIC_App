using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL.EntityLayer;
using EIC.Investment.API.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EIC.Investment.API.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [Route("api/Document")]
    public class UploadDocumentController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IHostingEnvironment _hostingEnvironment;

        public UploadDocumentController(IHostingEnvironment hostingEnvironment, ApplicationDbContext context)
        {
            _hostingEnvironment = hostingEnvironment;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Document> GetDocument()
        {
            return _context.Document;
        }

        private string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }

        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                {".txt", "text/plain"},
                {".pdf", "application/pdf"},
                {".doc", "application/vnd.ms-word"},
                {".docx", "application/vnd.ms-word"},
                {".xls", "application/vnd.ms-excel"},
                {".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
                {".png", "image/png"},
                {".jpg", "image/jpeg"},
                {".jpeg", "image/jpeg"},
                {".gif", "image/gif"},
                {".csv", "text/csv"}
            };
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] DocumentVM vm)
        {
            //if (!ModelState.IsValid)
            //{
            //  return BadRequest(ModelState);
            //}

            var filePath = Path.Combine(_hostingEnvironment.WebRootPath, "Upload",
                vm.ServiceApplicationId + "_" + vm.ServicePrerequisiteId + ".pdf");

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await vm.KeyWords.CopyToAsync(stream);
            }

            var document = new Document
            {
                ServiceApplicationId = vm.ServiceApplicationId,
                ServicePrerequisiteId = vm.ServicePrerequisiteId,
                DocumentTypeId = 3,
                Title = vm.Name,
                KeyWords = vm.ServiceApplicationId + "_" + vm.ServicePrerequisiteId + ".pdf",
                IsActive = true,
                CreatedUserId = 1
            };
            var workFlowId = vm.WorkFlowId;
            if (workFlowId.HasValue)
            {
                var serviceWorkflow = _context.ServiceWorkflow.First(s => s.ServiceWorkflowId == workFlowId);
                serviceWorkflow.NextStepId = 18;
                _context.Entry(serviceWorkflow).State = EntityState.Modified;
            }

            _context.Document.Add(document);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDocument", new {id = document.DocumentTypeId}, document);
        }

        // GET: api/ProjectOutputs/5
        [HttpGet("{id}")]
        public IEnumerable<Document> GetProjectOutput([FromRoute] int id)
        {
            var documents = _context.Document.Where(d => d.ServiceApplicationId == id);

            return documents;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocument([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var document = await _context.Document.SingleOrDefaultAsync(m => m.DocumentId == id);
            if (document == null) return NotFound();

            _context.Document.Remove(document);
            await _context.SaveChangesAsync();

            return Ok(document);
        }
    }
}