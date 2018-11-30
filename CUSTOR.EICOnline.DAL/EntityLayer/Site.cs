using System;
using System.Collections.Generic;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class Site
  {
    public Site()
    {
      Investor = new HashSet<Investor>();
      Project = new HashSet<Project>();
      ProjectInjunction = new HashSet<ProjectInjunction>();
      ProjectRenewal = new HashSet<ProjectRenewal>();
      ServiceSite = new HashSet<ServiceSite>();
    }

    public int? SiteId { get; set; }
    public string Name { get; set; }
    public string NameEnglish { get; set; }
    public string SiteCode { get; set; }
    public bool? IsActive { get; set; }
    public bool? IsDeleted { get; set; }
    public DateTime? EventDatetime { get; set; }
    public int? CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    public ICollection<Investor> Investor { get; set; }
    public ICollection<Project> Project { get; set; }
    public ICollection<ProjectInjunction> ProjectInjunction { get; set; }
    public ICollection<ProjectRenewal> ProjectRenewal { get; set; }
    public ICollection<ServiceSite> ServiceSite { get; set; }
  }
}