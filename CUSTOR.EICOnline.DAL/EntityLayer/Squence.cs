using System.ComponentModel.DataAnnotations;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public class Squence
  {
    [Key]
    public int ID { get; set; }
    public int LastSquence { get; set; }
    public string SiteID { get; set; }
  }
}
