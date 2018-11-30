using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class Log
  {
    public int LogId { get; set; }
    public string Message { get; set; }
    public string MessageTemplate { get; set; }
    public string Level { get; set; }
    public DateTime? RaiseDate { get; set; }
    public string Exception { get; set; }
    public string Properties { get; set; }
    public string PropsTest { get; set; }
    public string MachineName { get; set; }
    public DateTime? TimeStamp { get; set; }
    public string LogEvent { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }
  }
}