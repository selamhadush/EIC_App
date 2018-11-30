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
    public class SubGroupRepository : EFRepository<ApplicationDbContext, SubGroup>
    {
        public SubGroupRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<List<SubGroup>> GetRecordsById(object Id)
        {
            List<SubGroup> SubGroups = null;
            try
            {
                int id = (int)Id;
                SubGroups = await Context.SubGroup
                  .Where(SubGroup => SubGroup.Parent == id)
                                .ToListAsync();
            }
            catch (InvalidOperationException)
            {
                SetError("Couldn't load SubGroups - invalid SubGroup id specified.");
                return null;
            }
            catch (Exception ex)
            {
                SetError(ex);
            }
            return SubGroups;
        }

        public async Task<List<SubGroup>> GetRecords()
        {
            List<SubGroup> SubGroups = null;
            try
            {
                SubGroups = await Context.SubGroup
                                .ToListAsync();
            }
            catch (InvalidOperationException)
            {
                SetError("Couldn't load SubGroup");
                return null;
            }
            catch (Exception ex)
            {
                SetError(ex);
            }
            return SubGroups;
        }
    }
}
