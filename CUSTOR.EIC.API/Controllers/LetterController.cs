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
    public class LetterController : Controller
    {
        private readonly LetterRepository _LetterRepo;

        private ApplicationDbContext context;

        public LetterController(ApplicationDbContext ctx, LetterRepository LetterRepo)
        {
            context = ctx;
            _LetterRepo = LetterRepo;
        }

        [HttpGet]
        [Route("api/throw")]
        public object Throw()
        {
            throw new InvalidOperationException("This is an unhandled exception");
        }


        [HttpGet]
        [Route("api/letters/{id:int}")]
        public async Task<IEnumerable<Letter>> GetLetters(int id, int page = -1, int pageSize = 10)
        {
            return await _LetterRepo.GetLetters(id, page, pageSize);
        }


        //[HttpGet]
        //[Route("api/letterTemplates/ByProjectId/{id:int}")]
        //public IEnumerable< LetterTemplateLookup> GetLetters(int id, int page = -1, int pageSize = 10)
        //{
        //    return _LetterRepo.GetLetters(id, page, pageSize);
        //}

        [HttpGet("api/letter/{id:int}")]
        public Letter GetLetterTemplate(int id)
        {
            return _LetterRepo.GetLetter(id);
        }

        [HttpPost("api/letter")]
        public async Task<Letter> SaveLette([FromBody] Letter PostedGetLetter)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);
            //if (!_LetterRepo.Validate(PostedGetLetterTemplate))
            //throw new ApiException(_LetterRepo.ErrorMessage, 500, _LetterRepo.ValidationErrors);

            if (!await _LetterRepo.SaveAsync(PostedGetLetter))
                throw new ApiException(_LetterRepo.ErrorMessage);
            return PostedGetLetter;
        }

        [HttpDelete("api/letter/{id:int}")]
        public async Task<bool> DeleteLetterTemplate(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in first", 401);

            return await _LetterRepo.DeleteLetter(id);
        }
    }
}