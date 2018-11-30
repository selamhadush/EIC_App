using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ProjectInjunction
  {
    public int ProjectInjunctionId { get; set; }
    public int ProjectId { get; set; }
    public int InjunctionType { get; set; }
    public int InjunctionBody { get; set; }
    public string InjunctionLetterNo { get; set; }
    public DateTime InjunctionDate { get; set; }
    public DateTime InjunctionRegisteredDate { get; set; }
    public DateTime InjunctionEndDate { get; set; }
    public string InjunctionReason { get; set; }
    public int InjunctionApprovedBy { get; set; }
    public DateTime InjunctionApprovedDate { get; set; }
    public string InjunctionLiftedLetterNo { get; set; }
    public DateTime InjunctionLiftedDate { get; set; }
    public DateTime InjunctionRegisteredLiftedDate { get; set; }
    public string InjunctionLiftedReason { get; set; }
    public int InjunctionLiftedApprovedBy { get; set; }
    public DateTime InjunctionLiftedApprovedDate { get; set; }
    public int Status { get; set; }
    public int SiteId { get; set; }
    public DateTime Remark { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    public Site Site { get; set; }
  }
}