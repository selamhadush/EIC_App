using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL.DataAccessLayer
{
    public class TaxExemptionRepository : EFRepository<ApplicationDbContext, IncentiveTaxExemptionRequest>
    {
        public TaxExemptionRepository(ApplicationDbContext context) : base(context)
        { }

        public Task<List<IncentiveTaxExemptionRequest>> GetTaxExemptions(int id, int page = 0, int pageSize = 15)
        {
            IQueryable<IncentiveTaxExemptionRequest> TaxExemptions = Context.IncentiveTaxExemptionRequest
                .Where(tax => tax.ProjectId == id);
            //.OrderBy(Let => Let.TaxExemptionId);
            if (page > 0)
            {
                TaxExemptions = TaxExemptions
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
            }

            return TaxExemptions.ToListAsync();
        }

        public IncentiveTaxExemptionRequest GetTaxExemption(object IncentiveRequestIteId)
        {
            IncentiveTaxExemptionRequest taxExemptions = null;
            try
            {
                int id = (int)IncentiveRequestIteId;
                taxExemptions = Context.IncentiveTaxExemptionRequest
                                       .Where(subss => subss.IncentiveTaxExemptionRequestID == id).FirstOrDefault();
            }
            catch (InvalidOperationException)
            {
                SetError("Couldn't load TaxExemption - invalid TaxExemption id specified.");
                return null;
            }
            catch (Exception ex)
            {
                SetError(ex);
            }
            return taxExemptions;
        }

        public async Task<bool> DeleteTaxExemption(int id)
        {
            var TaxExemption = await Context.IncentiveTaxExemptionRequest
                .FirstOrDefaultAsync(incentiveRequestItem => incentiveRequestItem.IncentiveTaxExemptionRequestID == id);
            if (TaxExemption == null)
            {
                SetError("TaxExemption does not exist");
                return false;
            }
            Context.IncentiveTaxExemptionRequest.Remove(TaxExemption);
            return await SaveAsync();
        }

        //protected override bool OnValidate(TaxExemption entity)
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
