using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CUSTOR.EICOnline.API.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    public class OrderController : Controller
    {
        private readonly OrderRepository _OrderRepo;
        private readonly ApplicationDbContext context;

        public OrderController(ApplicationDbContext ctx, OrderRepository SectorRepo)
        {
            context = ctx;
            _OrderRepo = SectorRepo;
        }

        [HttpGet]
        [Route("api/throw")]
        public object Throw()
        {
            throw new InvalidOperationException("This is an unhandled exception");
        }

        [HttpGet]
        [Route("api/orderslookup")]
        public async Task<IEnumerable<Order>> GetOrder()
        {
            return await _OrderRepo.GetOrders();
        }

        [HttpGet]
        [Route("api/orders")]
        public async Task<IEnumerable<Order>> GetOrder(int page = -1, int pageSize = 10)
        {
            return await _OrderRepo.GetOrders(page, pageSize);
        }

        [HttpGet("api/order/{id:int}")]
        public Order GetOrder(int id)
        {
            return _OrderRepo.GetRecord(id);
        }

        [HttpPost("api/order")]
        public async Task<IActionResult> SaveOrder([FromBody] Order PostedOrder)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);

            var editedorder = PostedOrder;
            editedorder.EventDatetime = DateTime.Now;
            editedorder.IsPaid = true;
            editedorder.CreatedUserId = 1;
            editedorder.PaymentTypeId = 3;

            context.Add(editedorder);
            context.SaveChanges();

            return CreatedAtAction("GetOrder", new {id = PostedOrder.OrderId}, PostedOrder);
        }

        [HttpDelete("api/order/{id:int}")]
        public async Task<bool> DeleteOrder(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in first", 401);

            return await _OrderRepo.DeleteOrder(id);
        }
    }
}