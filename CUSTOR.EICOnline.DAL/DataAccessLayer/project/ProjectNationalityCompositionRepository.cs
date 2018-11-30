using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;

namespace CUSTOR.EICOnline.DAL
{
  public class ProjectNationalityCompositionRepository : EFRepository<ApplicationDbContext, ProjectNationalityComposition>
  {
    public ProjectNationalityCompositionRepository(ApplicationDbContext context) : base(context)
    {
    }
  }
}