using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CUSTOR.EICOnline.DAL
{
  public partial class Woreda
  {
    public Woreda()
    {
      Kebeles = new List<Kebele>();
    }

    public string WoredaId { get; set; }
    public string ZoneId { get; set; }
    public string Description { get; set; }
    public string DescriptionEnglish { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? EventDatetime { get; set; }
    public string UpdatedUsername { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }

    public Zone Zone { get; set; }
    public ICollection<Kebele> Kebeles { get; set; }
  }

  public partial class WoredaViewModel
  {
    public WoredaViewModel()
    {
    }

    [Key]
    public string WoredaId { get; set; }

    public string ZoneId { get; set; }
    public string Description { get; set; }
    //public string DescriptionEnglish { get; set; }
  }
}