using System;
using System.Collections.Generic;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ServiceStep
  {
    public ServiceStep()
    {
      ServiceWorkflowNextStep = new HashSet<ServiceWorkflow>();
      ServiceWorkflowStep = new HashSet<ServiceWorkflow>();
    }

    public int? ServiceStepId { get; set; }
    public string Name { get; set; }
    public string NameEnglish { get; set; }
    public int? LegalStatusId { get; set; }
    public int ServiceId { get; set; }
    public bool? RequiresSignature { get; set; }
    public bool IsActive { get; set; }
    public bool? IsDeleted { get; set; }
    public DateTime? EventDatetime { get; set; }
    public int? CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    public Lookup LegalStatus { get; set; }
    public Service Service { get; set; }
    public ICollection<ServiceWorkflow> ServiceWorkflowNextStep { get; set; }
    public ICollection<ServiceWorkflow> ServiceWorkflowStep { get; set; }
  }
}