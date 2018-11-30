using System;

namespace EIC.Investment.API.ViewModels.Dto
{
    public class SearchDto
    {
        public int? ServiceId { get; set; }
        public int? status { get; set; }
        public DateTime? SpecDate { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}