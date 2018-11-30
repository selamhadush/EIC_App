using System;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL.DataAccessLayer
{
  public class AssociateRepository : EFRepository<ApplicationDbContext, Associate>
  {
    public AssociateRepository(ApplicationDbContext context) : base(context)
    {
    }

    public override async Task<Associate> GetRecord(object AssociateId)
    {
      Associate associate = null;
      try
      {
        int id = (int)AssociateId;
        associate = await Context.Associate
                        .FirstOrDefaultAsync(inv => inv.AssociateId == id);
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load Investor - invalid Investor id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }
      return associate;
    }





    public async Task<bool> DeleteInvestor(int id)
    {
      var associate = await Context.Associate
          .FirstOrDefaultAsync(inv => inv.AssociateId == id);
      if (associate == null)
      {
        SetError("Investor does not exist");
        return false;
      }
      Context.Associate.Remove(associate);
      return await SaveAsync();
    }


  }
}
