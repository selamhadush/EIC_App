using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EICOnline.DAL.EntityLayer.AllAddress;
using CUSTOR.EntityFrameworkCommon;

namespace CUSTOR.EICOnline.DAL
{
  public class NationalityRepository : EFRepository<ApplicationDbContext, Nationality>
  {
    public NationalityRepository(ApplicationDbContext context) : base(context)
    {
    }
  }
}