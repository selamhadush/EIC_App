using System.Collections.Generic;

namespace CUSTOR.EICOnline.DAL
{
  public partial class SubSector
  {
    public SubSector()
    {
      Activity = new HashSet<Activity>();
    }

    public int SubSectorId { get; set; }

    //public string? ParentId { get; set; }
    public int SectorId { get; set; }

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

    public Sector Sector { get; set; }
    public ICollection<Activity> Activity { get; set; }
    //public ICollection<Project> Project { get; set; }
  }
}