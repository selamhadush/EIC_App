using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public class ProjectStatusHistory
  {
    public int ProjectStatusHistoryId { get; set; }
    public int ProjectStatus { get; set; }
    public int ProjectStage { get; set; }
    public int ProjectId { get; set; }
    public DateTime EventDatetime { get; set; }
    public DateTime UpdatedEventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public int UpdatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public string UpdatedUserName { get; set; }

    public int? Quarter { get; set; }
    public DateTime? RegistrationYear { get; set; }

  }
}