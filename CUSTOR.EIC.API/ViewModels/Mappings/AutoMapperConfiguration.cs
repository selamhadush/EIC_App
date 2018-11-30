using AutoMapper;
using CUSTOR.EICOnline.DAL;

namespace EIC.Investment.API.ViewModels.Mappings
{
    public class AutoMapperConfiguration : Profile
    {
        public AutoMapperConfiguration() : this("MyProfile")
        {
        }

        protected AutoMapperConfiguration(string profileName) : base(profileName)
        {
            CreateMap<Sector, SectorViewModel>();
        }
    }
}