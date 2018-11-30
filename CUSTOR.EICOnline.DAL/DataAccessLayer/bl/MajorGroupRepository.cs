using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EICOnline.DAL.EntityLayer.bl;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CUSTOR.EICOnline.DAL.DataAccessLayer.bl
{
    public class MajorGroupRepository : EFRepository<ApplicationDbContext, Division>
    {
        public MajorGroupRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<List<MajorGroup>> GetRecordsById(object Id)
        {
            List<MajorGroup> MajorGroups = null;
            try
            {
                int id = (int)Id;
                MajorGroups = await Context.MajorGroup
                  .Where(tblDivision => tblDivision.Parent == id)
                                .ToListAsync();
            }
            catch (InvalidOperationException)
            {
                SetError("Couldn't load MajorGroups - invalid MajorGroups id specified.");
                return null;
            }
            catch (Exception ex)
            {
                SetError(ex);
            }
            return MajorGroups;
        }

        public async Task<List<MajorGroup>> GetRecords()
        {
            List<MajorGroup> tblMajorGroups = null;
            try
            {
                tblMajorGroups = await Context.MajorGroup
                                .ToListAsync();
            }
            catch (InvalidOperationException)
            {
                SetError("Couldn't load tblMajorGroups");
                return null;
            }
            catch (Exception ex)
            {
                SetError(ex);
            }
            return tblMajorGroups;
        }
    }
}
