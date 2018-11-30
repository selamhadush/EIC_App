using System;
using System.Collections.Generic;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public class TodoTask
  {
    public TodoTask()
    {
      ServiceApplication = new HashSet<ServiceApplication>();

    }
    public int TodoTaskId { get; set; }
    public int ServiceApplicationId { get; set; }
    public DateTime AssignedDate { get; set; }
    public DateTime EndDate { get; set; }
    public int CurrentStatusId { get; set; }
    public string AssignedUserId { get; set; }
    public string Remark { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public string CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    public ICollection<ServiceApplication> ServiceApplication { get; set; }

  }
}
