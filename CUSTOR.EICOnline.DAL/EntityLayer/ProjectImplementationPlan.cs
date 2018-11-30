using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ProjectImplementationPlan
  {
    public int ProjectImplementationPlanId { get; set; }
    public int ProjectId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime CompletionDate { get; set; }
    public DateTime FeasibilityStudy { get; set; }
    public DateTime LandAcquisition { get; set; }
    public DateTime CivilWorks { get; set; }
    public DateTime Electricity { get; set; }
    public DateTime Water { get; set; }
    public DateTime Telecom { get; set; }
    public DateTime OtherUtility { get; set; }
    public DateTime MachineryProcurement { get; set; }
    public DateTime MachineryInstallation { get; set; }
    public DateTime RawMaterialPreparation { get; set; }
    public DateTime MachineryTesting { get; set; }
    public DateTime OtherTasks { get; set; }
    public string OtherTasksDescription { get; set; }
    public DateTime ProjectCommissioning { get; set; }
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
  }
}