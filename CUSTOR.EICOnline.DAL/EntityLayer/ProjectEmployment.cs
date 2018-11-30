using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ProjectEmployment
  {
    public int ProjectEmploymentId { get; set; }
    public int ProjectId { get; set; }
    public bool IsActual { get; set; }
    public int PermanentFemale { get; set; }
    public int PermanentMale { get; set; }
    public int TemporaryFemale { get; set; }
    public int TemporaryMale { get; set; }
    public int PermanentForeignFemale { get; set; }
    public int PermanentForeignMale { get; set; }
    public int TemporaryForeignFemale { get; set; }
    public int TemporaryForeignMale { get; set; }
    public string Remark { get; set; }
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
    public int? workFlowId { get; set; }

    public Project Project { get; set; }

    public int? ProjectStatus { get; set; }
    public int? Quarter { get; set; }
    public DateTime? RegistrationYear { get; set; }
  }
}