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
    //[Route("api/Woredas/{Lang}")]
    public class WoredasController
    {
        private readonly WoredaRepo _WoredaRepo;

        public WoredasController(WoredaRepo woredaRepo)
        {
            _WoredaRepo = woredaRepo;
        }

        [HttpGet]
        [Route("api/woredas/{Lang}")]
        public async Task<IEnumerable<WoredaViewModel>> GetAllWoredas(string lang)
        {
            return await _WoredaRepo.GetAllWoredas(lang);
        }

        [HttpGet]
        [Route("api/woredas")]
        public async Task<IEnumerable<Woreda>> GetWoredas(int page = -1, int pageSize = 10)
        {
            return await _WoredaRepo.GetWoredas(page, pageSize);
        }

        [HttpGet]
        [Route("api/woreda/{id}")]
        public Woreda GetWoreda(string id)
        {
            return _WoredaRepo.GetWoreda(id);
        }

        //[HttpGet]
        //[Route("api/woredas")]
        //public async Task<IEnumerable<Woreda>> GetAllWoredas()
        //{
        //    return await _WoredaRepo.GetAllWoredas();
        //}
        [HttpPost("api/woreda")]
        public async Task<Woreda> saveWoreda([FromBody] Woreda postedWoreda)
        {
            //if (!ModelState.IsValid)
            //    throw new ApiException("Model binding failed.", 500);
            //if (!_WoredaRepo.Validate(postedWoreda))
            //    throw new ApiException(_WoredaRepo.ErrorMessage, 500, _WoredaRepo.ValidationErrors);

            if (!await _WoredaRepo.SaveAsync(postedWoreda))
                throw new ApiException(_WoredaRepo.ErrorMessage);
            return postedWoreda;
        }

        [HttpDelete("api/woreda/{id}")]
        public async Task<bool> Deleteworeda(string id)
        {
            return await _WoredaRepo.DeleteWoreda(id);
        }
    }
}