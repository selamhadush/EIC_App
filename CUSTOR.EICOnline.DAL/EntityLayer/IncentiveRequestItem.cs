using System;
using System.Collections.Generic;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class IncentiveRequestItem1
  {
    public IncentiveRequestItem1()
    {
      IncentiveRequestItemReconciliation = new HashSet<IncentiveRequestItemReconciliation>();
    }

    public int IncentiveRequestItemId { get; set; }
    public int RequestId { get; set; }
    public int IncentiveItemId { get; set; }
    public int IncentiveCategoryId { get; set; }
    public decimal AmountInBirr { get; set; }
    public decimal AmountInUsd { get; set; }
    public int Quantity { get; set; }
    public int UnitId { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    public Lookup IncentiveCategory { get; set; }
    public IncentiveItem IncentiveItem { get; set; }
    public IncentiveRequest Request { get; set; }
    public Lookup Unit { get; set; }
    public ICollection<IncentiveRequestItemReconciliation> IncentiveRequestItemReconciliation { get; set; }
  }
}