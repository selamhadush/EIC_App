using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CUSTOR.EICOnline.DAL.EntityLayer;

namespace CUSTOR.EICOnline.DAL
{
  public partial class InvestmentActivity
  {
    public InvestmentActivity()
    {
      //List<SubSector> SubSector = new HashSet<SubSector>();
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int InvActivityId { get; set; }

    //public string? ParentId { get; set; }
    public int ActivityId { get; set; }

    //public int SubSectorId { get; set; }
    //public int? SectorId { get; set; }
    public string Description { get; set; }
    public string Code { get; set; }

    public string DescriptionSort { get; set; }
    public string DescriptionSoundX { get; set; }
    public string DescriptionAlias { get; set; }
    public string DescriptionEnglish { get; set; }
    public string DescriptionEnglishAlias { get; set; }
    public int InAddisOromiaAreas { get; set; }
    public int InOtherAreas { get; set; }

    //public bool? IsActive { get; set; }
    //public bool IsDeleted { get; set; }
    //public DateTime EventDatetime { get; set; }
    //public int CreatedUserId { get; set; }
    //public string CreatedUserName { get; set; }
    //public DateTime? UpdatedEventDatetime { get; set; }
    //public int? UpdatedUserId { get; set; }
    //public string UpdatedUserName { get; set; }
    //public Guid? ObjectId { get; set; }

    public Activity Activity { get; set; }
    public Project Project { get; set; }

    //public ICollection<SubSector> SubSector { get; set; }
  }
}