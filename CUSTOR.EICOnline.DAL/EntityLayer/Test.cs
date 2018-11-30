using System.ComponentModel.DataAnnotations;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public class Test
  {
    [Key]
    public int Id { get; set; }

    public string Name { get; set; }
    public int Age { get; set; }
  }
}