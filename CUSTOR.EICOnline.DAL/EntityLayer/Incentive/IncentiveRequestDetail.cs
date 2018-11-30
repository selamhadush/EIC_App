using System;
using System.ComponentModel.DataAnnotations;

namespace CUSTOR.EICOnline.DAL.EntityLayer.Incentive
{
    public class IncentiveRequestDetail
    {
        [Key]
        public int IncentiveRequestDetailId { get; set; }
        public int IncentiveRequestId { get; set; }
        public int? ProjectId { get; set; }
        public int? IncentiveItemId { get; set; }
        public int IncentiveCategoryId { get; set; }
        public decimal? Amount { get; set; }
        public string Description { get; set; }
        public decimal Quantity { get; set; }
        public decimal ApprovedQty { get; set; }
        public string MotorNo { get; set; }
        public string ChassisNo { get; set; }
        public decimal Balance { get; set; }
         public int? CurrencyType { get; set; }
        public decimal? CurrencyRate { get; set; }
        public string MeasurementUnit { get; set; }
        public bool IsDeleted { get; set; }
        public bool? IsApproved { get; set; }
        public DateTime? EventDatetime { get; set; }
        public int CreatedUserId { get; set; }
        public string CreatedUserName { get; set; }
        public DateTime? UpdatedEventDatetime { get; set; }
        public int? UpdatedUserId { get; set; }
        public string UpdatedUserName { get; set; }
        public Guid? ObjectId { get; set; }

        //public decimal? TotalAmount { get; set; }
        //public decimal? UsedAmount { get; set; }
        //public string IncentiveCategory { get; set; }
    }
}
