using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EICOnline.DAL.EntityLayer.bl;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CUSTOR.EICOnline.DAL.DataAccessLayer.bl
{
    public class MajorDivisionRepository : EFRepository<ApplicationDbContext, MajorDivision>
    {
        public MajorDivisionRepository(ApplicationDbContext context) : base(context)
        {
        }
        public async Task<List<MajorDivision>> GetRecords()
        {
            List<MajorDivision> MajorDivisions = null;
            try
            {
                MajorDivisions = await Context.MajorDivision
                 .ToListAsync();
            }
            catch (InvalidOperationException)
            {
                SetError("Couldn't load MajorDivisions");
                return null;
            }
            catch (Exception ex)
            {
                SetError(ex);
            }
            return MajorDivisions;
        }
    }
}
