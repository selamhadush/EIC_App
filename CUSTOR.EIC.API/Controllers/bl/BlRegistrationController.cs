using System.Collections.Generic;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.DataAccessLayer.bl;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EICOnline.DAL.EntityLayer.bl;
using Microsoft.AspNetCore.Mvc;

namespace CUSTOR.EICOnline.API.Controllers.bl
{
    public class BlRegistrationController : Controller
    {
        // GET
        private ApplicationDbContext context;
        private readonly BlRegistrationRepository Repo;
        private MajorDivisionRepository MajorDivisionRepo;
        private MajorGroupRepository MajorGroupRepo;
        private DivisionRepository DivisionRepo;
        private GroupRepository GroupRepo;
        private SubGroupRepository SubGroupRepo;
        
        public  BlRegistrationController(ApplicationDbContext ctx, BlRegistrationRepository repo)
        {
            Repo = repo;
            context = ctx;
        }
        [HttpGet]
        [Route("api/bl")]
        public async Task<IEnumerable<BlRegistration>> Get(int page = -1, int pageSize = 10)
        {
            //throw new ApiException("Model binding failed.");
            return await Repo.GetAll(page, pageSize);
        }
        [HttpGet]
        [Route("api/MajorDivisions")]
        public async Task<IEnumerable<MajorDivision>> GetMajorDivisions()
        {
            MajorDivisionRepo = new MajorDivisionRepository(context);
            return await MajorDivisionRepo.GetRecords();
        }
        [HttpGet("api/MajorGroup")]
        public async Task<IEnumerable<MajorGroup>> GetMajorGroups()
        {
            MajorGroupRepository tblMajorGroupRepo = new MajorGroupRepository(context);
            return await tblMajorGroupRepo.GetRecords();
        }

        [HttpGet("api/Groups")]
        public async Task<IEnumerable<Group>> GetGroups()
        {
            GroupRepo = new GroupRepository(context);
            return await GroupRepo.GetRecords();
        }

        [HttpGet("api/SubGroups")]
        public async Task<IEnumerable<SubGroup>> GettblSubGroups()
        {
            SubGroupRepo = new SubGroupRepository(context);
            return await SubGroupRepo.GetRecords();
        }

    }
}