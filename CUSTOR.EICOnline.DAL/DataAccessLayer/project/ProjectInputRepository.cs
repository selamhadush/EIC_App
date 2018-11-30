using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;

namespace CUSTOR.EICOnline.DAL
{
  public class ProjectInputRepository : EFRepository<ApplicationDbContext, ProjectInput>
  {
    public ProjectInputRepository(ApplicationDbContext context) : base(context)
    {
    }
  }
}