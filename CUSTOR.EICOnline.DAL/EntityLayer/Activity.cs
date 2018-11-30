using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CUSTOR.EICOnline.DAL
{
  public partial class Activity
  {
    public Activity()
    {
      InvestmentActivity = new HashSet<InvestmentActivity>();
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ActivityId { get; set; }

    public int SubSectorId { get; set; }
    //public int InvActivityId { get; set; }
    //public string? ParentId { get; set; }

    public string Description { get; set; }
    public string DescriptionSort { get; set; }
    public string DescriptionSoundX { get; set; }
    public string DescriptionAlias { get; set; }
    public string DescriptionEnglish { get; set; }
    public string DescriptionEnglishAlias { get; set; }
    //public bool? IsActive { get; set; }
    //public bool IsDeleted { get; set; }
    //public DateTime EventDatetime { get; set; }
    //public int CreatedUserId { get; set; }
    //public string CreatedUserName { get; set; }
    //public DateTime? UpdatedEventDatetime { get; set; }
    //public int? UpdatedUserId { get; set; }
    //public string UpdatedUserName { get; set; }
    //public Guid? ObjectId { get; set; }

    //public Sector Sector { get; set; }
    public SubSector SubSector { get; set; }

    public ICollection<InvestmentActivity> InvestmentActivity { get; set; }
    //public ICollection<Project> Project { get; set; }
  }
}