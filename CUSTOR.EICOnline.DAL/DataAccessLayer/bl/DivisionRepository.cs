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
    public class DivisionRepository : EFRepository<ApplicationDbContext, Division>
    {
        public DivisionRepository(ApplicationDbContext context) : base(context)
        {
        }
        public async Task<List<Division>> GetRecordsById(object Id)
        {
            List<Division> Divisions = null;
            try
            {
                int id = (int)Id;
                Divisions = await Context.Division
                  .Where(Division => Division.Parent == id)
                                .ToListAsync();
            }
            catch (InvalidOperationException)
            {
                SetError("Couldn't load Division - invalid Division id specified.");
                return null;
            }
            catch (Exception ex)
            {
                SetError(ex);
            }
            return Divisions;
        }
        public async Task<List<Division>> GetRecords()
        {
            List<Division> Divisions = null;
            try
            {
                Divisions = await Context.Division
                                .ToListAsync();
            }
            catch (InvalidOperationException)
            {
                SetError("Couldn't load Division - invalid Division id specified.");
                return null;
            }
            catch (Exception ex)
            {
                SetError(ex);
            }
            return Divisions;
        }
    }
}
