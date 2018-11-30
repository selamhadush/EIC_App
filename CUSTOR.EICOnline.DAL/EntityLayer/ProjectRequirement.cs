using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ProjectRequirement
  {
    public int ProjectRequirementId { get; set; }
    public int ProjectId { get; set; }
    public decimal ElectricPower { get; set; }
    public decimal Water { get; set; }
    public decimal OtherUtility { get; set; }
    public decimal LandIndustrial { get; set; }
    public decimal LandAgricultural { get; set; }
    public decimal LandService { get; set; }
    public decimal? OwnLand { get; set; }
    public decimal? RentalLand { get; set; }
    public decimal? LeaseLand { get; set; }
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

  public class ProjectRequirementVm
  {
    public ProjectRequirementVm()
    {
    }

    public int ProjectRequirementId { get; set; }
    public int ProjectId { get; set; }
    public decimal ElectricPower { get; set; }
    public decimal Water { get; set; }
    public decimal OtherUtility { get; set; }
    public decimal LandIndustrial { get; set; }
    public decimal LandAgricultural { get; set; }
    public decimal LandService { get; set; }
    public string Remark { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }

    public int? ProjectStatus { get; set; }
    public int? Quarter { get; set; }
    public DateTime? RegistrationYear { get; set; }
  }
}