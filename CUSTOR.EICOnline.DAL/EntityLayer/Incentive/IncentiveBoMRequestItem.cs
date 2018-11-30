using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  [Table(name: "IncentiveBoMRequestItem")]
  public class IncentiveBoMRequestItem
  {
    public IncentiveBoMRequestItem()
    {
    }
    public int IncentiveBoMRequestItemId { get; set; }
    public int ServiceApplicationId { get; set; }
    public int IncentiveRequestId { get; set; }
    public int ProjectId { get; set; }
    public int IncentiveCategoryId { get; set; }
    public string Description { get; set; }
    public string HsCode { get; set; }
    public decimal Quantity { get; set; }
    public string MesurmentUnit { get; set; }
    public Boolean IsApproved { get; set; }
    public Boolean IsDeleted { get; set; }
    public decimal ApprovedQuantity { get; set; }
    public decimal Balance { get; set; }
    public DateTime EventDatetime { get; set; }
    public int? RejectionReason { get; set; }
    public int? Phase { get; set; }
    public int? CreatedUserId { get; set; }
    public int? UpdatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid ObjectId { get; set; }
    public ServiceApplication ServiceApplication { get; set; }

  }






}
