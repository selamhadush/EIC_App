using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace EICOnline.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    public class CustomerController : Controller
    {
        private ApplicationDbContext context;
        private readonly CustomerRepository CustomerRepo;

        public CustomerController(ApplicationDbContext ctx, CustomerRepository customerRepo)
        {
            context = ctx;
            CustomerRepo = customerRepo;
        }

        [HttpGet]
        [Route("api/throw")]
        public object Throw()
        {
            throw new InvalidOperationException("This is an unhandled exception");
        }

        [HttpGet]
        [Route("api/customers")]
        public async Task<IEnumerable<Customer>> GetCustomers(int page = -1, int pageSize = 10)
        {
            //throw new ApiException("Model binding failed.");
            return await CustomerRepo.GetAllCustomers(page, pageSize);
        }

        [HttpGet("api/customer/{id:int}")]
        public async Task<Customer> GetCustomer(int id)
        {
            return await CustomerRepo.GetRecord(id);
        }

        [HttpPost("api/customer")]
        public async Task<Customer> SaveCustomer([FromBody] Customer postedCustomer)
        {
            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);
            //if (!CustomerRepo.Validate(postedCustomer))
            //    throw new ApiException(CustomerRepo.ErrorMessage, 500, CustomerRepo.ValidationErrors);

            if (!await CustomerRepo.SaveAsync(postedCustomer))
                throw new ApiException(CustomerRepo.ErrorMessage);
            return postedCustomer;
        }

        [HttpDelete("api/customer/{id:int}")]
        public async Task<bool> DeleteCustomer(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in first", 401);

            return await CustomerRepo.DeleteCustomer(id);
        }
    }
}