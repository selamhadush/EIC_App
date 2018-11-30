using System;

namespace EIC.Investment.API.ViewModels
{
    public class SectorViewModel
    {
        public string SectorId { get; set; }
        public string Description { get; set; }

        public bool? IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public Guid? ObjectId { get; set; }
    }
}