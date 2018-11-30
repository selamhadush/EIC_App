using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;

namespace CUSTOR.EICOnline.DAL
{
  public class ProjectEmploymentRepository : EFRepository<ApplicationDbContext, ProjectEmployment>
  {
    public ProjectEmploymentRepository(ApplicationDbContext context) : base(context)
    {
    }
  }
}