using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL.DataAccessLayer
{
  public class LetterTemplateRepository : EFRepository<ApplicationDbContext, LetterTemplate>
  {
    public LetterTemplateRepository(ApplicationDbContext context) : base(context)
    { }

    public Task<List<LetterTemplate>> GetLetterTemplates(int id, int page = 0, int pageSize = 15)
    {
      IQueryable<LetterTemplate> LetterTemplates = Context.LetterTemplate
          .OrderBy(Let => Let.LetterTemplateId);
      if (page > 0)
      {
        LetterTemplates = LetterTemplates
        .Skip((page - 1) * pageSize)
        .Take(pageSize);
      }

      return LetterTemplates.ToListAsync();
    }

    public LetterTemplate GetLetterTemplate(object IncentiveRequestIteId)
    {
      LetterTemplate incentiveRequestItems = null;
      try
      {
        int id = (int)IncentiveRequestIteId;
        incentiveRequestItems = Context.LetterTemplate
                               .Where(subss => subss.LetterType == id).FirstOrDefault();
      }
      catch (InvalidOperationException)
      {
        SetError("Couldn't load LetterTemplate - invalid LetterTemplate id specified.");
        return null;
      }
      catch (Exception ex)
      {
        SetError(ex);
      }
      return incentiveRequestItems;
    }

    public async Task<bool> DeleteLetterTemplate(int id)
    {
      var LetterTemplate = await Context.LetterTemplate
          .FirstOrDefaultAsync(incentiveRequestItem => incentiveRequestItem.LetterTemplateId == id);
      if (LetterTemplate == null)
      {
        SetError("LetterTemplate does not exist");
        return false;
      }
      Context.LetterTemplate.Remove(LetterTemplate);
      return await SaveAsync();
    }

    //protected override bool OnValidate(LetterTemplate entity)
    //{
    //    if (entity == null)
    //    {
    //        ValidationErrors.Add("No record was provided");
    //        return false;
    //    }
    //    //if (string.IsNullOrEmpty(entity.Name))
    //    //    ValidationErrors.Add("Please enter Name", "Name");
    //    //else if (string.IsNullOrEmpty(entity.Name) || entity.Name.Length < 2)
    //    //    ValidationErrors.Add("TariffName Name must be at least 2 charcters long");
    //    return ValidationErrors.Count < 1;
    //}
  }
}
