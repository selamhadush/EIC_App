using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
    public class LookupRepository : EFRepository<ApplicationDbContext, Lookups>
    {
        public LookupRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<List<Lookup>> GetAllLookups()
        {
            try
            {
                IQueryable<Lookup> lookups = Context.Lookups
                    .OrderBy(l => l.DescriptionEnglish);

                return await lookups.ToListAsync();
            }
            catch (Exception ex)
            {
                SetError(ex);
                return null;
            }
        }
        public async Task<ICollection<Lookups>> GetRecordByParentandByCode(int LookupId, int Id1, int Id2)
        {
            ICollection<Lookups> lookups = null;
            try
            {
                int id = (int)LookupId;
                lookups = await Context.Lookup
                                        .Where(look => look.LookUpTypeId == id && (look.LookupId == Id1 || look.LookupId == Id2)).ToListAsync();
            }
            catch (InvalidOperationException)
            {
                SetError("Couldn't load Lookup - invalid Lookup id specified.");
                return null;
            }
            catch (Exception ex)
            {
                SetError(ex);
            }

            return lookups;
        }

        public IEnumerable<LookupsModel> GetLookups(int page = 0, int pageSize = 15)
        {
            var lookups = (from sp in Context.Lookup
                           join s in Context.LookupType on sp.LookUpTypeId equals s.LookUpTypeId
                           select new LookupsModel()
                           {
                               LookupId = sp.LookupId,
                               Amharic = sp.Amharic,
                               English = sp.English,
                               DescriptionEnglish = s.DescriptionEnglish
                           }).AsEnumerable();
            if (page > 0)
            {
                lookups = lookups
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
            }

            return lookups;
        }
        //public async Task<List<Lookups>> GetLookups(int page = 0, int pageSize = 15)
        //{
        //    IQueryable<Lookups> lookups = Context.Lookup
        //        .OrderBy(Lookups => Lookups.English);
        //    if (page > 0)
        //    {
        //        lookups = lookups
        //        .Skip((page - 1) * pageSize)
        //        .Take(pageSize);
        //    }
        //    return await lookups.ToListAsync();
        //}
        public async Task<List<LookupViewModel>> GetAllLookupsByLang(string lang)
        {
            try
            {
                return await Context.Lookups
                    .Select(l => new LookupViewModel

                    {
                        LookupId = l.LookupId,
                        LookUpTypeId = l.LookUpTypeId,
                        Description = (lang == "et") ? l.Description : l.DescriptionEnglish
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                SetError(ex);
                return null;
            }
        }
        public override async Task<Lookups> GetRecord(object LookupId)
        {
            Lookups lookups = null;
            try
            {
                int id = (int)LookupId;
                lookups = await Context.Lookup
                                        .Where(look => look.LookupId == id).FirstOrDefaultAsync();
            }
            catch (InvalidOperationException)
            {
                SetError("Couldn't load Lookup - invalid Lookup id specified.");
                return null;
            }
            catch (Exception ex)
            {
                SetError(ex);
            }

            return lookups;
        }


        public async Task<ICollection<Lookups>> GetRecordByParent(object LookupId)
        {
            ICollection<Lookups> lookups = null;
            try
            {
                int id = (int)LookupId;
                lookups = await Context.Lookup
                                        .Where(look => look.LookUpTypeId == id).ToListAsync();
            }
            catch (InvalidOperationException)
            {
                SetError("Couldn't load Lookup - invalid Lookup id specified.");
                return null;
            }
            catch (Exception ex)
            {
                SetError(ex);
            }

            return lookups;
        }
        public async Task<bool> DeleteLookup(int id)
        {
            var Lookup = await Context.Lookup
                .FirstOrDefaultAsync(lookup => lookup.LookupId == id);
            if (Lookup == null)
            {
                SetError("Lookup does not exist");
                return false;
            }
            Context.Lookup.Remove(Lookup);
            return await SaveAsync();
        }

        protected override bool OnValidate(Lookups entity)
        {
            if (entity == null)
            {
                ValidationErrors.Add("No record was provided");
                return false;
            }
            if (string.IsNullOrEmpty(entity.English))
                ValidationErrors.Add("Please enter English", "English");
            else if (string.IsNullOrEmpty(entity.English) || entity.English.Length < 2)
                ValidationErrors.Add("Description Name must be at least 2 charcters long");
            return ValidationErrors.Count < 1;
        }
    }
}