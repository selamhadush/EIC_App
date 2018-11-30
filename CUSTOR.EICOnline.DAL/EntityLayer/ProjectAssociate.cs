using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ProjectAssociate
  {
    public int ProjectAssociateId { get; set; }
    public int ProjectId { get; set; }
    public int AssociateId { get; set; }
    public int Postion { get; set; }
    public int Status { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }

    public Guid? ObjectId { get; set; }

    public Associate Associate { get; set; }
    public Project Project { get; set; }
  }
}