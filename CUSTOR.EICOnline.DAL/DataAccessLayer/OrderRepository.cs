using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL
{
  public class OrderRepository : EFRepository<ApplicationDbContext, Order>
  {
    public OrderRepository(ApplicationDbContext context) : base(context)
    {
    }

    public Order GetRecord(int OrderId)
    {
      Order order = null;
      try
      {
        int id = (int)OrderId;

        order = Context.Order
                                //.Include(p => p.Service)
                                .Where(ord => ord.ServiceApplicationId == id).FirstOrDefault();
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load Order - invalid Order id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }

      return order;
    }

    public async Task<List<Order>> GetOrders(int page = 0, int pageSize = 15)
    {
      IQueryable<Order> orders = Context.Order

                           .OrderBy(order => order.OrderId);
      if (page > 0)
      {
        orders = orders
        .Skip((page - 1) * pageSize)
        .Take(pageSize);
      }

      return await orders.ToListAsync();
    }

    public async Task<bool> DeleteOrder(int id)
    {
      var Order = await Context.Order
          .FirstOrDefaultAsync(servicestep => servicestep.OrderId == id);
      if (Order == null)
      {
        SetError("Order does not exist");
        return false;
      }
      Context.Order.Remove(Order);
      return await SaveAsync();
    }

    //protected override bool OnValidate(Order entity)
    //{
    //    if (entity == null)
    //    {
    //        ValidationErrors.Add("No record was provided");
    //        return false;
    //    }
    //    //if (string.IsNullOrEmpty(entity.NameEnglish))
    //    //    ValidationErrors.Add("Please enter NameEnglish", "NameEnglish");
    //    //else if (string.IsNullOrEmpty(entity.NameEnglish) || entity.NameEnglish.Length < 2)
    //    //    ValidationErrors.Add("NameEnglish Name must be at least 2 charcters long");
    //    //return ValidationErrors.Count < 1;
    //}
  }
}