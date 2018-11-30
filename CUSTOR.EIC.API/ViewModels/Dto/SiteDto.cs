namespace EIC.Investment.API.ViewModels.Dto
{
    public class SiteDto
    {
        public int SiteId { get; set; }
        public string Name { get; set; }
        public string NameEnglish { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
    }
}