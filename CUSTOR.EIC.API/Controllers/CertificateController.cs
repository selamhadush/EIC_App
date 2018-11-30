using System.Linq;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.API.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [Route("api/Certificate")]
    public class CertificateController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CertificateController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public ServiceApplication GetServiceApplication([FromRoute] int id)
        {
            return _context.ServiceApplication
                .Include(s => s.Investor)
                .Include(s => s.Project)
                .SingleOrDefault(m => m.ServiceApplicationId == id);
            //.Include(In => In.Investor);
        }

        [HttpGet("investorAdress/{id}")]
        public Kebele GetInvestorAdress([FromRoute] int id)
        {
            var address = _context.Address.FirstOrDefault(a => a.ParentId == id);
            return _context.Kebeles.Include(w => w.Woreda)
                .ThenInclude(z => z.Zone)
                .ThenInclude(r => r.Region)
                .Where(x => x.KebeleId == address.KebeleId).FirstOrDefault();
            //.Include(In => In.Investor);
        }
    }
}