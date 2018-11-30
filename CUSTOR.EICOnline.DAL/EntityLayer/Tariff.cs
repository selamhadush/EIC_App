using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CUSTOR.EICOnline.DAL
{
  public partial class Tariff
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int? TariffId { get; set; }

    public string Name { get; set; }
    public string NameEnglish { get; set; }
    public string AccCode { get; set; }
    public double Fee { get; set; }
    public double IncrementalFee { get; set; }
    public int TariffModeId { get; set; }
    public int Quantity { get; set; }
    public bool IsActive { get; set; }
  }
}