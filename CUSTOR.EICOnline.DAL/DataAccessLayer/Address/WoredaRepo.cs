using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CUSTOR.EICOnline.DAL.EntityLayer;
using CUSTOR.EntityFrameworkCommon;
using Microsoft.EntityFrameworkCore;

namespace CUSTOR.EICOnline.DAL.DataAccessLayer.Address
{
    public class WoredaRepo : EFRepository<ApplicationDbContext, Woreda>
    {
        public WoredaRepo(ApplicationDbContext context) : base(context)
        { }

        //public async Task<List<WoredaViewModel>> GetWoredas(object zId)
        //{
        //    try
        //    {
        //        //IQueryable<Woreda> woredas = Context.Woredas;
        //        //return await woredas.ToListAsync();
        //        string id = zId.ToString();
        //        return await Context.Woredas
        //            .Where(zn => zn.ZoneId == id)
        //            .Select(w => new WoredaViewModel()
        //            {
        //                ZoneId = w.ZoneId,
        //                WoredaId = w.WoredaId,
        //        //DescriptionEnglish = w.DescriptionEnglish,
        //        Description = w.Description
        //            })
        //            .ToListAsync();
        //    }
        //    catch (Exception ex)
        //    {
        //        SetError(ex);
        //        return null;
        //    }
        //}

        public async Task<List<WoredaViewModel>> GetAllWoredas(string lang)
        {
            try
            {
                return await Context.Woredas
                    .Select(w => new WoredaViewModel

                    {
                        ZoneId = w.ZoneId,
                        WoredaId = w.WoredaId,
                //DescriptionEnglish = w.DescriptionEnglish,
                Description = (lang == "et") ? w.Description : w.DescriptionEnglish
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                SetError(ex);
                return null;
            }
        }
        public async Task<List<Woreda>> GetWoredas(int page = 0, int pageSize = 15)
        {

            IQueryable<Woreda> woreda = Context.Woredas
                .Include(z => z.Zone)
                .OrderBy(zo => zo.WoredaId);
            if (page > 0)
            {
                woreda = woreda
                .Skip((page - 1) * pageSize)
                .Take(pageSize);
            }
            return await woreda.ToListAsync();
        }

        public async Task<List<Woreda>> GetWoredas(object zId)
        {
            try
            {
                //IQueryable<Woreda> woredas = Context.Woredas;
                //return await woredas.ToListAsync();
                string id = zId.ToString();
                return await Context.Woredas
                    .Where(zn => zn.ZoneId == id)
                    .Select(w => new Woreda()
                    {
                        ZoneId = w.ZoneId,
                        WoredaId = w.WoredaId,
                        DescriptionEnglish = w.DescriptionEnglish,
                        Description = w.Description
                    })
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                SetError(ex);
                return null;

            }
        }
        public Woreda GetWoreda(object rId)
        {
            Woreda woreda = null;
            try
            {
                string id = rId.ToString();
                woreda = Context.Woredas
                               .Include(r => r.Zone)
                               .Include(r => r.Kebeles)
                           .Where(x => x.WoredaId == id).FirstOrDefault();
            }
            catch (Exception ex)
            {
                SetError(ex);
                return null;
            }
            return woreda;
        }
        public async Task<List<Woreda>> GetAllWoredas()
        {
            try
            {

                IQueryable<Woreda> woredas = Context.Woredas;
                int i = woredas.Count();
                return await woredas.ToListAsync();

            }
            catch (Exception ex)
            {
                SetError(ex);
                return null;

            }
        }
        public async Task<bool> DeleteWoreda(string id)
        {

            var Woreda = await Context.Woredas
                .FirstOrDefaultAsync(zo => zo.WoredaId == id);
            if (Woreda == null)
            {
                SetError("Woreda does not exist");
                return false;
            }
            Context.Woredas.Remove(Woreda);
            return await SaveAsync();

        }
    }
}