using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CUSTOR.EICOnline.DAL
{
  public partial class Region
  {
    public Region()
    {
      Towns = new List<Town>();
      Zones = new List<Zone>();
    }

    public string RegionId { get; set; }
    public string Description { get; set; }
    public string DescriptionEnglish { get; set; }
    public string CreatedUserName { get; set; }
    //public string IsActive { get; set; }
    //public string IsDeleted { get; set; }
    public DateTime? EventDatetime { get; set; }
    public string UpdatedUsername { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }

    public ICollection<Town> Towns { get; set; }
    public ICollection<Zone> Zones { get; set; }
  }

  public partial class RegionViewModel
  {
    public RegionViewModel()
    {
    }

    [Key]
    public string RegionId { get; set; }

    public string Description { get; set; }
  }
}