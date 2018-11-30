using System.Collections.Generic;
using System.Threading.Tasks;
using CUSTOR.API.ExceptionFilter;
using CUSTOR.EICOnline.DAL;
using CUSTOR.EICOnline.DAL.DataAccessLayer.Address;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace CUSTOR.EICOnline.API.Controllers.Address
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    //[Route("api/Kebeles/{Lang}")]
    public class KebelesController
    {
        private readonly KebeleRepo _KebebeleRepo;

        public KebelesController(KebeleRepo kebeleRepo)
        {
            _KebebeleRepo = kebeleRepo;
        }

        //[HttpGet]
        //public async Task<IEnumerable<KebeleViewModel>> GetAllKebeles(string lang)
        //{
        //    return await _KebebeleRepo.GetAllKebeles(lang);
        //}

        [HttpGet("api/Kebeles/{Lang}/{WoredaId}")]
        public async Task<IEnumerable<KebeleViewModel>> GetAllKebelesByWoredaId(string lang, string WoredaId)
        {
            return await _KebebeleRepo.GetKebele(lang, WoredaId);
        }
        //[HttpGet]
        //[Route("api/KebelesByWoreda/{id}")]
        //public async Task<IEnumerable<Kebele>> GetKebeles(string id)
        //{
        //    return await _KebebeleRepo.GetKebelesByWoredaId(id);
        //}

        [HttpGet]
        [Route("api/Kebele/ById/{id}")]
        public Kebele GetKebele(string id)
        {
            return _KebebeleRepo.GetKebele(id);
        }

        [HttpGet]
        [Route("api/kebeles/{Lang}")]
        public async Task<IEnumerable<KebeleViewModel>> GetAllKebeles(string lang)
        {
            return await _KebebeleRepo.GetAllKebeles(lang);
        }

        [HttpGet]
        [Route("api/kebeles")]
        public async Task<IEnumerable<Kebele>> GetKebeles(int page = -1, int pageSize = 10)
        {
            return await _KebebeleRepo.GetKebeles(page, pageSize);
        }

        [HttpPost("api/kebele")]
        public async Task<Kebele> saveKebele([FromBody] Kebele postedKebele)
        {
            //if (!ModelState.IsValid)
            //    throw new ApiException("Model binding failed.", 500);
            //if (!_KebebeleRepo.Validate(postedKebele))
            //    throw new ApiException(_KebebeleRepo.ErrorMessage, 500, _KebebeleRepo.ValidationErrors);

            if (!await _KebebeleRepo.SaveAsync(postedKebele))
                throw new ApiException(_KebebeleRepo.ErrorMessage);
            return postedKebele;
        }

        [HttpDelete("api/kebele/{id}")]
        public async Task<bool> DeleteKebele(string id)
        {
            return await _KebebeleRepo.DeleteKebele(id);
        }
    }
}