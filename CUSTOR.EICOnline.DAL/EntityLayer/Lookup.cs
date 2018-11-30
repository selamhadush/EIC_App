using System;
using System.ComponentModel.DataAnnotations;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class Lookup
  {
    public Lookup()
    {
    }

    [Key]
    public int LookupId { get; set; }

    public int LookUpTypeId { get; set; }
    public string Code { get; set; }
    public string Description { get; set; }
    public string DescriptionEnglish { get; set; }
    public string Username { get; set; }
    public string UpdatedUsername { get; set; }
    public DateTime? EventDatetime { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
  }




  public partial class LookupViewModel
  {
    public LookupViewModel()
    {
    }

    [Key]
    public int LookupId { get; set; }

    public int LookUpTypeId { get; set; }
    public string Description { get; set; }
  }
}