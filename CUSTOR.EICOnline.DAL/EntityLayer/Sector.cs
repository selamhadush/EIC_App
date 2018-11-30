using System.Collections.Generic;
using CUSTOR.EICOnline.DAL.EntityLayer;

namespace CUSTOR.EICOnline.DAL
{
  public partial class Sector
  {
    public Sector()
    {
      SubSector = new HashSet<SubSector>();
    }

    public int SectorId { get; set; }
    public string Description { get; set; }
    public string DescriptionAlias { get; set; }
    public string DescriptionEnglish { get; set; }
    public string DescriptionEnglishAlias { get; set; }
    public int EconomicSector { get; set; }

    public ICollection<SubSector> SubSector { get; set; }
    public Project Project { get; set; }
  }

  public partial class SectorLookup
  {
    public SectorLookup()
    {
    }

    public int SectorId { get; set; }
    public string Description { get; set; }
    public string DescriptionAlias { get; set; }
    public string DescriptionEnglish { get; set; }
    public string DescriptionEnglishAlias { get; set; }
    public int EconomicSector { get; set; }
  }
}