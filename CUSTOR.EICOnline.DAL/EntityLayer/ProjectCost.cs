using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ProjectCost
  {
    public int ProjectCostId { get; set; }
    public int ProjectId { get; set; }
    public bool IsActual { get; set; }
    public decimal LandCost { get; set; }
    public decimal BuildingCost { get; set; }
    public decimal MachineryCost { get; set; }
    public decimal TransportCost { get; set; }
    public decimal OfficeEquipmentCost { get; set; }
    public decimal OtherCapitalCost { get; set; }
    public decimal InitialWorkingCapitalCost { get; set; }
    public decimal EquityFinance { get; set; }
    public decimal LoanFinance { get; set; }
    public decimal OtherSourceFinance { get; set; }
    public string OtherSourceDescription { get; set; }
    public decimal? ActualCostInForeign { get; set; }
    public int Unit { get; set; }
    public decimal ExchangeRate { get; set; }
    public string Remark { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public int? ProjectStatus { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public DateTime? CapitalRegistrationDatetime { get; set; }
    public int? Quarter { get; set; }
    public DateTime? ReagistrationYear { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    [NotMapped]
    public int? workFlowId { get; set; }

    public Project Project { get; set; }
  }

  public partial class ProjectCostRequest
  {
    public int ProjectCostId { get; set; }
    public int ProjectId { get; set; }
    public bool IsActual { get; set; }
    public decimal LandCost { get; set; }
    public decimal BuildingCost { get; set; }
    public decimal MachineryCost { get; set; }
    public decimal TransportCost { get; set; }
    public decimal OfficeEquipmentCost { get; set; }
    public decimal OtherCapitalCost { get; set; }
    public decimal InitialWorkingCapitalCost { get; set; }
    public decimal EquityFinance { get; set; }
    public decimal LoanFinance { get; set; }
    public decimal OtherSourceFinance { get; set; }
    public decimal OtherSourceDescription { get; set; }
    public int Unit { get; set; }
    public decimal ExchangeRate { get; set; }
    public string Remark { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public DateTime? CapitalRegistrationDatetime { get; set; }
    public int? ProjectStatus { get; set; }
    public int? Quarter { get; set; }
    public DateTime? ReagistrationYear { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }
    public int workFlowId { get; set; }
    public Project Project { get; set; }
  }
}