using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class LookupType
  {
    [Key]
    public int LookUpTypeId { get; set; }
    //public string Code { get; set; }
    public string DescriptionEnglish { get; set; }
    public string Description { get; set; }
    //public string SortX { get; set; }
    //public string SoundX { get; set; }
    //public string Tigrigna { get; set; }
    //public string AfanOromo { get; set; }
    //public string Afar { get; set; }
    //public string Somali { get; set; }
    //public string Arabic { get; set; }
    //public int Order { get; set; }
    //public bool? IsActive { get; set; }
    //public bool IsDeleted { get; set; }
    //public DateTime EventDatetime { get; set; }
    //public int CreatedUserId { get; set; }
    //public string CreatedUserName { get; set; }
    //public DateTime? UpdatedEventDatetime { get; set; }
    //public int? UpdatedUserId { get; set; }
    //public string UpdatedUserName { get; set; }
    //public Guid? ObjectId { get; set; }
    public ICollection<Lookup> Lookup { get; set; }
  }
}