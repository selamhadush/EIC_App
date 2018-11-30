using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.DataAccessLayer.dto;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL
{
  public class InvestorRepository : EFRepository<ApplicationDbContext, Investor>
  {
    public InvestorRepository(ApplicationDbContext context) : base(context)
    {
    }

    public override async Task<Investor> GetRecord(object InvestorId)
    {
      Investor investor = null;
      try
      {
        int id = (int)InvestorId;
        investor = await Context.Investors
          .Include(p => p.Associate)
                        .FirstOrDefaultAsync(inv => inv.InvestorId == id);
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
      return investor;
    }
    public async Task<List<Investor>> GetRecordByUserId(object UserId)
    {
      List<Investor> investor = null;
      try
      {
        string id = (string)UserId;
        investor = await Context.Investors
          .Where(inv => inv.UserId == id)
                        .ToListAsync();
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
      return investor;
    }


    public async Task<List<Investor>> GetRecordByTIN(object Tin)
    {
      List<Investor> investor = null;
      try
      {
        string id = (string)Tin;
        investor = await Context.Investors
          .Where(inv => inv.Tin == id)
                        .ToListAsync();
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
      return investor;
    }

    public async Task<List<Investor>> FindInvestor(SearchInvestorDto searchInvestorDto)
    {
      List<Investor> investor = null;
      try
      {

        if (searchInvestorDto.Tin != null && searchInvestorDto.FirstNameEng != null && searchInvestorDto.FatherNameEng != null && searchInvestorDto.GrandNameEng != null)
        {

          investor = await Context.Investors.
         Where(m => EF.Functions.Like(m.Tin, searchInvestorDto.Tin + "%") &&
                   EF.Functions.Like(m.FirstNameEng, searchInvestorDto.FirstNameEng + "%") &&
                   EF.Functions.Like(m.FatherNameEng, searchInvestorDto.FatherNameEng + "%") &&
                  EF.Functions.Like(m.GrandNameEng, searchInvestorDto.GrandNameEng + "%"))
                       .ToListAsync();
        }
        else if (searchInvestorDto.FirstNameEng != null && searchInvestorDto.FatherNameEng != null && searchInvestorDto.GrandNameEng != null)
        {
          investor = await Context.Investors.
          Where(m => EF.Functions.Like(m.FirstNameEng, searchInvestorDto.FirstNameEng + "%") &&
                    EF.Functions.Like(m.FatherNameEng, searchInvestorDto.FatherNameEng + "%") &&
                   EF.Functions.Like(m.GrandNameEng, searchInvestorDto.GrandNameEng + "%"))
                        .ToListAsync();
        }
        else if (searchInvestorDto.FirstNameEng != null && searchInvestorDto.FatherNameEng != null)
        {
          investor = await Context.Investors.
           Where(m => EF.Functions.Like(m.FirstNameEng, searchInvestorDto.FirstNameEng + "%") &&
                     EF.Functions.Like(m.FatherNameEng, searchInvestorDto.FatherNameEng + "%"))
                         .ToListAsync();
        }
        else if (searchInvestorDto.FirstNameEng != null)
        {
          investor = await Context.Investors.
            Where(m => EF.Functions.Like(m.FirstNameEng, searchInvestorDto.FirstNameEng + "%"))
                          .ToListAsync();
        }
        else if (searchInvestorDto.Tin != null)
        {
          investor = await Context.Investors.
          Where(m => EF.Functions.Like(m.Tin, searchInvestorDto.Tin + "%"))
                        .ToListAsync();
        }
        else
        {
          investor = await Context.Investors
                         .ToListAsync();
        }

        //context.Customers.Where(c => EF.Functions.Like(c.Name, "a%"));


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
      return investor;
    }

    public async Task<List<Investor>> GetAllInvestors(int page = 0, int pageSize = 15)
    {
      IQueryable<Investor> investors = null;
      try
      {
        investors = Context.Investors;
        if (page > 0)
        {
          investors = investors
          .Skip((page - 1) * pageSize)
          .Take(pageSize);
        }
        //foreach (Investor inv in Investors)
        //{
        //    string nm = inv.FirstName;
        //}

        int i = investors.ToList().Count;
      }
      catch (Exception ex)
      {
        string s = ex.Message;
        SetError(ex);
      }
      return await investors.ToListAsync();
    }

    public async Task<bool> DeleteInvestor(int id)
    {
      var investor = await Context.Investors
          .FirstOrDefaultAsync(inv => inv.InvestorId == id);
      if (investor == null)
      {
        SetError("Investor does not exist");
        return false;
      }
      Context.Investors.Remove(investor);
      return await SaveAsync();
    }

    protected override bool OnValidate(Investor entity)
    {
      if (entity == null)
      {
        ValidationErrors.Add("No record was provided");
        return false;
      }
      if (string.IsNullOrEmpty(entity.FirstName))
        ValidationErrors.Add("Please enter first name of the Investor", "FirstName");
      else if (string.IsNullOrEmpty(entity.FirstName) || entity.FirstName.Length < 2)
        ValidationErrors.Add("First Name must be at least 2 charcters long");
      return ValidationErrors.Count < 1;
    }
  }
}