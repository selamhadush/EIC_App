using System.ComponentModel.DataAnnotations;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
    public partial class Lookups
    {
        public Lookups()
        {
        }

        [Key]
        public int LookupId { get; set; }
        public int LookUpTypeId { get; set; }
        public string Amharic { get; set; }
        public string English { get; set; }

        //public string Username { get; set; }
        //public string UpdatedUsername { get; set; }
        //public DateTime? EventDatetime { get; set; }
        //public DateTime? UpdatedEventDatetime { get; set; }
        public LookupType LookupType { get; set; }

    }

    public partial class LookupsModel
    {
        public LookupsModel()
        {
        }

        [Key]
        public int LookupId { get; set; }
        public int LookUpTypeId { get; set; }
        public string Amharic { get; set; }
        public string English { get; set; }
        public string DescriptionEnglish { get; set; }
        //public string Username { get; set; }
        //public string UpdatedUsername { get; set; }
        //public DateTime? EventDatetime { get; set; }
        //public DateTime? UpdatedEventDatetime { get; set; }
        public LookupType LookupType { get; set; }

    }
}
