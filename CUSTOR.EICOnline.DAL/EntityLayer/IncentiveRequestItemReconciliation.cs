using System;
using CUSTOR.EICOnline.DAL.EntityLayer.Incentive;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class IncentiveRequestItemReconciliation
  {
    public int IncentiveRequestItemReconciliationId { get; set; }
    public int RequestItemId { get; set; }
    public string InvoiceNo { get; set; }
    public int? Quantity { get; set; }
    public int? UnitId { get; set; }
    public decimal? AmountInBirr { get; set; }
    public decimal? AmountInUsd { get; set; }
    public DateTime? ImportedDate { get; set; }
    public double? PercentageForExport { get; set; }
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

    public IncentiveRequestItem RequestItem { get; set; }
    public Lookup Unit { get; set; }
  }
}