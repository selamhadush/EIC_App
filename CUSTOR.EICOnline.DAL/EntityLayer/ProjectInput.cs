using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ProjectInput
  {
    public int ProjectInputId { get; set; }
    public int ProjectId { get; set; }
    public string RawMaterialType { get; set; }
    public Boolean IsForeign { get; set; }
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

    public Project Project { get; set; }
    public int? ProjectStatus { get; set; }
    public int? Quarter { get; set; }
    public DateTime? RegistrationYear { get; set; }
  }
}