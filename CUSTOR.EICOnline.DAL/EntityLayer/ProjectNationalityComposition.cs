using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ProjectNationalityComposition
  {
    public int ProjectNationalityCompositionId { get; set; }
    public int ProjectId { get; set; }
    public int Nationality { get; set; }
    public bool IsActual { get; set; }
    public int Qty { get; set; }
    public decimal SharePercent { get; set; }
    public string Description { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    [NotMapped]
    public int? workFlowId { get; set; }

    public Project Project { get; set; }
  }
}