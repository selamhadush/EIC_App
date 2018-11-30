using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CUSTOR.EICOnline.API.Controllers
{
    public class HomeController : Controller
    {
//        public IActionResult Index()
//        {
//            return View();
//        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return CreatedAtAction("get", new {id = ""}, "");
           
        }

        // GET api/values
        [Route("api/[controller]")]
        [Authorize]
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new[] {"value1", "value2"};
        }
    }
}