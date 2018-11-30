using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL.DataAccessLayer;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CUSTOR.EICOnline.API.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    public class LetterTemplateController : Controller
    {
        private readonly LetterTemplateRepository _LetterTemplateRepoo;

        private ApplicationDbContext context;

        public LetterTemplateController(ApplicationDbContext ctx, LetterTemplateRepository LetterTemplateRepo)
        {
            context = ctx;
            _LetterTemplateRepoo = LetterTemplateRepo;
        }

        [HttpGet]
        [Route("api/throw")]
        public object Throw()
        {
            throw new InvalidOperationException("This is an unhandled exception");
        }


        [HttpGet]
        [Route("api/letterTemplates")]
        public async Task<IEnumerable<LetterTemplate>> GetLetterTemplates(int id, int page = -1, int pageSize = 10)
        {
            return await _LetterTemplateRepoo.GetLetterTemplates(id, page, pageSize);
        }


        //[HttpGet]
        //[Route("api/letterTemplates/ByProjectId/{id:int}")]
        //public IEnumerable< LetterTemplateLookup> GetLetterTemplates(int id, int page = -1, int pageSize = 10)
        //{
        //    return _LetterTemplateRepoo.GetLetterTemplates(id, page, pageSize);
        //}

        [HttpGet("api/letterTemplate/{id:int}")]
        public LetterTemplate GetLetterTemplate(int id)
        {
            return _LetterTemplateRepoo.GetLetterTemplate(id);
        }

        [HttpPost("api/letterTemplate")]
        public async Task<LetterTemplate> SaveLetterTemplate([FromBody] LetterTemplate PostedGetLetterTemplate)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);
            //if (!_LetterTemplateRepoo.Validate(PostedGetLetterTemplate))
            //throw new ApiException(_LetterTemplateRepoo.ErrorMessage, 500, _LetterTemplateRepoo.ValidationErrors);

            if (!await _LetterTemplateRepoo.SaveAsync(PostedGetLetterTemplate))
                throw new ApiException(_LetterTemplateRepoo.ErrorMessage);
            return PostedGetLetterTemplate;
        }

        [HttpDelete("api/letterTemplate/{id:int}")]
        public async Task<bool> DeleteLetterTemplate(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in first", 401);

            return await _LetterTemplateRepoo.DeleteLetterTemplate(id);
        }
    }
}