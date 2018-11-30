using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CUSTOR.EICOnline.DAL
{
  public partial class ServiceTariff
  {
    public ServiceTariff()
    {
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int? ServiceTariffId { get; set; }

    public int ServiceId { get; set; }
    public int TariffId { get; set; }
    public Tariff Tariff { get; set; }
  }

  public partial class ServiceTariffLookup
  {
    public ServiceTariffLookup()
    {
    }

    public int? ServiceTariffId { get; set; }
    public int ServiceId { get; set; }

    //public int TariffId { get; set; }
    public string ServiceNameEnglish { get; set; }

    public string NameEnglish { get; set; }
    public double? Fee { get; set; }
    public int[] TariffId { get; set; }
  }
}