using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL.DataAccessLayer
{
  public class OrderDetailRepository : EFRepository<ApplicationDbContext, Order>
  {
    public OrderDetailRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<List<OrderDetail>> GetOrderDetail()
    {
      IQueryable<OrderDetail> Acts = Context.OrderDetail;
      return await Acts.ToListAsync();
    }
  }
}