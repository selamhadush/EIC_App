using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ProjectCancellation
  {
    public int ProjectCancellationId { get; set; }
    public int ProjectId { get; set; }
    public int ServiceApplicationId { get; set; }


    [NotMapped]
    public int InvestorId { get; set; }
    public int CancellationType { get; set; }
    public string CancellationLetterNo { get; set; }
    public DateTime CancellationDate { get; set; }
    public string CancellationReason { get; set; }
    public int ApprovedBy { get; set; }
    public DateTime ApprovedDate { get; set; }
    public string CancellationRemark { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    [NotMapped]
    public int ServiceId { get; set; }

    public Project Project { get; set; }
    public ServiceApplication ServiceApplication { get; set; }
  }
}