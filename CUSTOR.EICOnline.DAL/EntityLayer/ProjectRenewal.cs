using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ProjectRenewal
  {
    public int ProjectRenewalId { get; set; }
    public int ProjectId { get; set; }
    public int ServiceApplicationId { get; set; }

    [NotMapped]
    public int InvestorId { get; set; }
    [NotMapped]
    public int ServiceId { get; set; }
    public int ProjectStatus { get; set; }
    public DateTime RenewalDate { get; set; }
    public DateTime ExpectedStartDate { get; set; }
    public bool IsApproved { get; set; }
    public int ApprovedBy { get; set; }
    public DateTime ApprovedDate { get; set; }
    public DateTime RenewedFrom { get; set; }
    public DateTime RenewedTo { get; set; }
    public string MajorProblems { get; set; }
    public string Remark { get; set; }
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

    public Project Project { get; set; }
    public ServiceApplication ServiceApplication { get; set; }
    public Site Site { get; set; }
  }
}