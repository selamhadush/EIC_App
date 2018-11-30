using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CUSTOR.EICOnline.DAL.DataAccessLayer
{
  public class Notification
  {

    [Key]
    public int NotitficationId { get; set; }
    public string Subject { get; set; }
    public string CurrentStatus { get; set; }
    public int ServiceApplicationId { get; set; }
    public string Message { get; set; }
    public DateTime CreatedDate { get; set; }
    public string FromUserId { get; set; }
    public string ToUserId { get; set; }
    [NotMapped]
    public string UserId { get; set; }
    public bool isActive { get; set; }
  }
}
