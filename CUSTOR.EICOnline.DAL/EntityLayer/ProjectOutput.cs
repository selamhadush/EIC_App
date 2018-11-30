using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ProjectOutput
  {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ProjectOutputId { get; set; }

    public int ProjectId { get; set; }
    public string ProductName { get; set; }
    public bool IsActual { get; set; }
    public decimal ProductQty { get; set; }
    public decimal QuantityIncrease { get; set; }
    public string ProductUnit { get; set; }
    public decimal ProductValue { get; set; }
    public decimal DomesticMarketShare { get; set; }
    public decimal ExportMarketShare { get; set; }
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