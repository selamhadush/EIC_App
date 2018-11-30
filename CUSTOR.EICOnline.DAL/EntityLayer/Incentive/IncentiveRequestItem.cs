using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CUSTOR.EICOnline.DAL.EntityLayer.Incentive
{
  [Table(name: "Incentive_RequestItem")]
  public class IncentiveRequestItem
  {
    [Key]
    public int IncentiveRequestItemId { get; set; }
    public int? ProjectId { get; set; }
    public int? IncentiveItemId { get; set; }
    public int IncentiveCategoryId { get; set; }
    public decimal? Amount { get; set; }
    //public decimal? AmountInUsd { get; set; }
    public decimal Quantity { get; set; }
    public decimal ApprovedQty { get; set; }
    public string MotorNo { get; set; }
    public string ChassisNo { get; set; }
    public string InvoiceNo { get; set; }
    public int? CurrencyType { get; set; }
    public decimal? CurrencyRate { get; set; }
    public int? UnitId { get; set; }
    //public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public bool? IsApproved { get; set; }
    public DateTime? EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }
    //public int? LookupId { get; set; }
    //public int? LookUpTypeId { get; set; }

    //public Lookup Lookup { get; set; }
    //public LookupType LookupType { get; set; }        
  }

  public partial class Incentive_RequestItemLookup
  {
    public Incentive_RequestItemLookup()
    {
    }

    [Key]
    public int IncentiveRequestItemId { get; set; }
    public int ProjectId { get; set; }
    public string IncentiveItem { get; set; }
    public string IncentiveCategory { get; set; }
    public decimal? Amount { get; set; }
    //public decimal? AmountInUsd { get; set; }
    public int? UnitId { get; set; }
  }
}