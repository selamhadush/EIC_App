using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL.DataAccessLayer.Address
{
    public class KebeleRepo : EFRepository<ApplicationDbContext, Kebele>
    {
        public KebeleRepo(ApplicationDbContext context) : base(context)
        { }

        public async Task<List<KebeleViewModel>> GetKebele(string lang, string wrdId)
        {
            //KebeleViewModel used to list required fields only.
            try
            {
                //IQueryable<Kebele> ViewModel = Context.ViewModel;
                //return await ViewModel.ToListAsync();
                return await Context.Kebeles
                    .Where(wrd => wrd.WoredaId == wrdId)
                    .Select(k => new KebeleViewModel()
                    {
                        WoredaId = k.WoredaId,
                        KebeleId = k.KebeleId,
                //DescriptionEnglish = k.DescriptionEnglish,
                Description = (lang == "et") ? k.Description : k.DescriptionEnglish
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                SetError(ex);
                return null;
            }
        }

        public async Task<List<KebeleViewModel>> GetAllKebeles(string lang)
        {
            try
            {
                return await Context.Kebeles
                    .Select(k => new KebeleViewModel

                    {
                        WoredaId = k.WoredaId,
                        KebeleId = k.KebeleId,
                //DescriptionEnglish = k.DescriptionEnglish,
                Description = (lang == "et") ? k.Description : k.DescriptionEnglish
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                SetError(ex);
                return null;
            }
        }

        public async Task<List<KebeleViewModel>> GetAllKebelesBYWoredaId(string lang)
        {
            try
            {
                return await Context.Kebeles
                    .Select(k => new KebeleViewModel

                    {
                        WoredaId = k.WoredaId,
                        KebeleId = k.KebeleId,
                        Description = (lang == "et") ? k.Description : k.DescriptionEnglish
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                SetError(ex);
                return null;
            }
        }

        public async Task<List<Kebele>> GetKebeles(object wrdId)
        {
            //KebeleLookup used to list required fields only.
            try
            {
                //IQueryable<Kebele> kebeles = Context.Kebeles;
                //return await kebeles.ToListAsync();
                string id = wrdId.ToString();
                return await Context.Kebeles
                    .Where(wrd => wrd.WoredaId == id)
                    .Select(k => new Kebele()
                    {
                        WoredaId = k.WoredaId,
                        KebeleId = k.KebeleId,
                        DescriptionEnglish = k.DescriptionEnglish,
                        Description = k.Description
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                SetError(ex);
                return null;

            }
        }

        public async Task<List<Kebele>> GetKebelesByWoredaId(object wrdId)
        {
            //KebeleLookup used to list required fields only.
            try
            {
                //IQueryable<Kebele> kebeles = Context.Kebeles;
                //return await kebeles.ToListAsync();
                string id = wrdId.ToString();
                return await Context.Kebeles
                    .Where(wrd => wrd.WoredaId == id)
                    .Select(k => new Kebele()
                    {
                        WoredaId = k.WoredaId,
                        KebeleId = k.KebeleId,
                        DescriptionEnglish = k.DescriptionEnglish,
                        Description = k.Description
                    })
                   .Where(x => x.WoredaId == id).
                   ToListAsync();
            }
            catch (Exception ex)
            {
                SetError(ex);
                return null;

            }
        }

        public Kebele GetKebele(object rId)
        {
            Kebele kebele = null;
            try
            {
                string id = rId.ToString();
                kebele = Context.Kebeles
                               .Include(r => r.Woreda)
                               .ThenInclude(z => z.Zone)
                           .Where(x => x.KebeleId == id).FirstOrDefault();
            }
            catch (Exception ex)
            {
                SetError(ex);
                return null;
            }
            return kebele;
        }

        public async Task<List<Kebele>> GetKebeles(int page = 0, int pageSize = 15)
        {

            IQueryable<Kebele> kebele = Context.Kebeles
                .Include(r => r.Woreda)
                .OrderBy(zo => zo.KebeleId);
            if (page > 0)
            {
                kebele = kebele
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
            }
            return await kebele.ToListAsync();
        }

        public async Task<bool> DeleteKebele(string id)
        {

            var Kebele = await Context.Kebeles
                .FirstOrDefaultAsync(zo => zo.KebeleId == id);
            if (Kebele == null)
            {
                SetError("Kebele does not exist");
                return false;
            }
            Context.Kebeles.Remove(Kebele);
            return await SaveAsync();

        }
    }
}