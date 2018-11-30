using System;
using System.ComponentModel.DataAnnotations;

namespace CUSTOR.EICOnline.DAL

{
  public partial class Kebele
  {
    public string KebeleId { get; set; }
    public string WoredaId { get; set; }
    public string Description { get; set; }
    public string DescriptionEnglish { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? EventDatetime { get; set; }
    public string UpdatedUsername { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }

    public Woreda Woreda { get; set; }
  }

  public partial class KebeleViewModel
  {
    public KebeleViewModel()
    {
    }

    [Key]
    public string KebeleId { get; set; }

    public string WoredaId { get; set; }
    public string Description { get; set; }
    //public string DescriptionEnglish { get; set; }
  }
}