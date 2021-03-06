using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class OrderDetail
  {
    public OrderDetail()
    {
    }

    public OrderDetail(Int32? orderDetailID)
    {
      OrderDetailID = orderDetailID;
    }

    public Int32? OrderDetailID { get; set; }

    public Int32? OrderID { get; set; }

    public String Description { get; set; }

    public String AccCode { get; set; }

    public double? Amount { get; set; }

    //public String UserName { get; set; }

    public DateTime? EventDatetime { get; set; }

    public String UpdatedUsername { get; set; }

    public DateTime? UpdatedEventDatetime { get; set; }

    //public String Remark { get; set; }

    public Order OrderFk { get; set; }
  }
}