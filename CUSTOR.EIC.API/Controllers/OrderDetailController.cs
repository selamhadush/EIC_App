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
    [Route("api/OrderDetail")]
    public class OrderDetailController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly OrderDetailRepository _orderDetailRepository;

        public OrderDetailController(ApplicationDbContext context, OrderDetailRepository detailRepository)
        {
            _context = context;
            _orderDetailRepository = detailRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<OrderDetail>> GetOrderAsync()
        {
            return await _orderDetailRepository.GetOrderDetail();
        }
    }
}