using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
   public class BlRegistrationRepository : EFRepository<ApplicationDbContext, BlRegistration>
    {
        public BlRegistrationRepository(ApplicationDbContext context) : base(context)
        {

        }
        public override async Task<BlRegistration> GetRecord(object id)
        {
            BlRegistration blreg = null;
            try
            {
                int Id = (int)id;
                blreg = await Context.BlRegistration
                                .FirstOrDefaultAsync(cust => cust.id == Id);
            }
            catch (InvalidOperationException)
            {
                SetError("Couldn't load  - invalid id specified.");
                return null;
            }
            catch (Exception ex)
            {
                SetError(ex);
            }

            return blreg;
        }

        public async Task<List<BlRegistration>> GetAll(int page = 0, int pageSize = 15)
        {
            IQueryable<BlRegistration> blice = null;
            try
            {
                blice = Context.BlRegistration
                
                .OrderBy(cust => cust.id);

                if (page > 0)
                {
                    blice = blice
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize);
                }
                foreach (BlRegistration Cust in blice)
                {
                    int nm = Cust.id;
                }
                int i = blice.ToList().Count;
            }
            catch (Exception ex)
            {
                string s = ex.Message;
                SetError(ex);
            }
            return await blice.ToListAsync();
        }

        public async Task<bool> DeleteCustomer(int id)
        {
            var customer = await Context.BlRegistration
                .FirstOrDefaultAsync(cust => cust.id == id);
            if (customer == null)
            {
                SetError("Customer does not exist");
                return false;
            }
            Context.BlRegistration.Remove(customer);
            return await SaveAsync();
        }

        protected override bool OnValidate(BlRegistration entity)
        {
            if (entity == null)
            {
                ValidationErrors.Add("No record was provided");
                return false;
            }
            //if (string.IsNullOrEmpty(entity.FirstName))
            //    ValidationErrors.Add("Please enter first name of the customer", "FirstName");
            //else if (string.IsNullOrEmpty(entity.FirstName) || entity.FirstName.Length < 2)
            //    ValidationErrors.Add("First Name must be at least 2 charcters long");
            return ValidationErrors.Count < 1;
        }
    }
}
    


