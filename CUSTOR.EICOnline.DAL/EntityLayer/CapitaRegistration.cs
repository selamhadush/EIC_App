using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class CapitalRegistration
  {
    public int? CapitalRegistrationId { get; set; }
    public int ProjectId { get; set; }
    public bool IsActual { get; set; }
    public int AdviceReferenceNumber { get; set; }

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
    public DateTime? CapitalRegistrationDate { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    public Project Project { get; set; }
  }
}
