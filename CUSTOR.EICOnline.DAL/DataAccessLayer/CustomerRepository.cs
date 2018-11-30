using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public class CustomerRepository : EFRepository<ApplicationDbContext, Customer>
  {
    public CustomerRepository(ApplicationDbContext context) : base(context)
    {
    }

    public override async Task<Customer> GetRecord(object CustomerId)
    {
      Customer customer = null;
      try
      {
        int id = (int)CustomerId;
        customer = await Context.Customers
                        .FirstOrDefaultAsync(cust => cust.CustomerId == id);
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load Customer - invalid Customer id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }

      return customer;
    }

    public async Task<List<Customer>> GetAllCustomers(int page = 0, int pageSize = 15)
    {
      IQueryable<Customer> customers = null;
      try
      {
        customers = Context.Customers
        .OrderBy(cust => cust.FirstName);

        if (page > 0)
        {
          customers = customers
          .Skip((page - 1) * pageSize)
          .Take(pageSize);
        }
        foreach (Customer Cust in customers)
        {
          string nm = Cust.FirstName;
        }
        int i = customers.ToList().Count;
      }
      catch (Exception ex)
      {
        string s = ex.Message;
        SetError(ex);
      }
      return await customers.ToListAsync();
    }

    public async Task<bool> DeleteCustomer(int id)
    {
      var customer = await Context.Customers
          .FirstOrDefaultAsync(cust => cust.CustomerId == id);
      if (customer == null)
      {
        SetError("Customer does not exist");
        return false;
      }
      Context.Customers.Remove(customer);
      return await SaveAsync();
    }

    protected override bool OnValidate(Customer entity)
    {
      if (entity == null)
      {
        ValidationErrors.Add("No record was provided");
        return false;
      }
      if (string.IsNullOrEmpty(entity.FirstName))
        ValidationErrors.Add("Please enter first name of the customer", "FirstName");
      else if (string.IsNullOrEmpty(entity.FirstName) || entity.FirstName.Length < 2)
        ValidationErrors.Add("First Name must be at least 2 charcters long");
      return ValidationErrors.Count < 1;
    }
  }
}