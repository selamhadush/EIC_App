using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ProjectSubstitute
  {
    public int ProjectSubstituteId { get; set; }
    public int ProjectId { get; set; }
    public int ServiceApplicationId { get; set; }

    [NotMapped]
    public int InvestorId { get; set; }

    public int Reason { get; set; }

    public string SubstituteRemark { get; set; }
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