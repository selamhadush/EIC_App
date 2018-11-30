using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ServiceSite
  {
    public int ServiceSiteId { get; set; }
    public int ServiceId { get; set; }
    public int SiteId { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    public Service Service { get; set; }
    public Site Site { get; set; }
  }
}