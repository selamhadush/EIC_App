using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CUSTOR.EICOnline.DAL
{
  public partial class Zone
  {
    public Zone()
    {
      Woredas = new List<Woreda>();
    }

    [Key]
    public string ZoneId { get; set; }

    public string RegionId { get; set; }
    public string Description { get; set; }
    public string DescriptionEnglish { get; set; }
    public string CreatedUserName { get; set; }
    //public DateTime? EventDatetime { get; set; }
    //public string UpdatedUsername { get; set; }
    //public DateTime? UpdatedEventDatetime { get; set; }

    public Region Region { get; set; }
    public ICollection<Woreda> Woredas { get; set; }
  }

  public partial class ZoneViewModel
  {
    public ZoneViewModel()
    {
    }

    [Key]
    public string ZoneId { get; set; }

    public string RegionId { get; set; }
    public string Description { get; set; }
    //public string DescriptionEnglish { get; set; }
  }
}