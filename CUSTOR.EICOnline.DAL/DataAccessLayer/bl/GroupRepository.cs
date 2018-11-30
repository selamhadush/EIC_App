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
    public class GroupRepository : EFRepository<ApplicationDbContext, Group>
    {
        public GroupRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<List<Group>> GetRecordsById(object Id)
        {
            List<Group> Groups = null;
            try
            {
                int id = (int)Id;
                Groups = await Context.Group
                  .Where(tblGroup => tblGroup.Parent == id)
                                .ToListAsync();
            }
            catch (InvalidOperationException)
            {
                SetError("Couldn't load Group - invalid Group id specified.");
                return null;
            }
            catch (Exception ex)
            {
                SetError(ex);
            }
            return Groups;
        }

        public async Task<List<Group>> GetRecords()
        {
            List<Group> Groups = null;
            try
            {
                Groups = await Context.Group
                                .ToListAsync();
            }
            catch (InvalidOperationException)
            {
                SetError("Couldn't load Group");
                return null;
            }
            catch (Exception ex)
            {
                SetError(ex);
            }
            return Groups;
        }

    }
}
