using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace EIC.Investment.API.Controllers.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    public class ActivityController : Controller
    {
        private readonly ActivityRepository _ActivityRepo;
        private ApplicationDbContext context;

        public ActivityController(ApplicationDbContext ctx, ActivityRepository ActivityRepo)
        {
            context = ctx;
            _ActivityRepo = ActivityRepo;
        }

        [HttpGet]
        [Route("api/throw")]
        public object Throw()
        {
            throw new InvalidOperationException("This is an unhandled exception");
        }

        [HttpGet]
        [Route("api/activityslookup")]
        public async Task<IEnumerable<Activity>> GetActivity()
        {
            return await _ActivityRepo.GetActivitys();
        }

        [HttpGet]
        [Route("api/activitys")]
        public async Task<IEnumerable<Activity>> GetActivity(int page = -1, int pageSize = 10)
        {
            return await _ActivityRepo.GetActivitys(page, pageSize);
        }

        [HttpGet("api/activity/{id:int}")]
        public Activity GetActivity(int id)
        {
            return _ActivityRepo.GetActivity(id);
        }

        [HttpPost("api/activity")]
        public async Task<Activity> SaveActivity([FromBody] Activity PostedActivity)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);
            if (!_ActivityRepo.Validate(PostedActivity))
                //throw new ApiException(_ActivityRepo.ErrorMessage, 500, _ActivityRepo.ValidationErrors);

                if (!await _ActivityRepo.SaveAsync(PostedActivity))
                    throw new ApiException(_ActivityRepo.ErrorMessage);
            return PostedActivity;
        }

        [HttpDelete("api/activity/{id:int}")]
        public async Task<bool> DeleteActivity(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in first", 401);

            return await _ActivityRepo.DeleteActivity(id);
        }
    }
}