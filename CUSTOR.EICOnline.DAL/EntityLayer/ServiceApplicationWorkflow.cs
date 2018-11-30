using System;
using System.Collections.Generic;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ServiceApplicationWorkflow
  {
    public ServiceApplicationWorkflow()
    {
      ServiceOutput = new HashSet<ServiceOutput>();
    }

    public int ServiceApplicationWorkflowId { get; set; }
    public int ServiceWorkflowId { get; set; }
    public int ServiceApplicationId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public DateTime? SignedDate { get; set; }
    public string SignedBy { get; set; }
    public string SignerDesignation { get; set; }
    public string Remark { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    public ServiceApplication ServiceApplication { get; set; }
    public ServiceWorkflow ServiceWorkflow { get; set; }
    public ICollection<ServiceOutput> ServiceOutput { get; set; }
  }
}