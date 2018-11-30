using System;
using System.Collections.Generic;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ServiceWorkflowHistory
  {
    public ServiceWorkflowHistory()
    {
      //ServiceApplicationWorkflow = new HashSet<ServiceApplicationWorkflow>();
      ServiceWorkflowInputDocument = new HashSet<ServiceWorkflowInputDocument>();
      ServiceWorkflowOutputDocument = new HashSet<ServiceWorkflowOutputDocument>();
    }

    public int ServiceWorkflowHistoryId { get; set; }
    public int ServiceApplicationId { get; set; }

    public int StepId { get; set; }
    public int ActionId { get; set; }
    public int FromStatusId { get; set; }
    public int ToStatusId { get; set; }
    public int PerformedByRoleId { get; set; }
    public int NextStepId { get; set; }
    public bool GenerateEmail { get; set; }
    public bool GenerateLetter { get; set; }
    public bool IsDocumentRequired { get; set; }
    public int? ServiceId { get; set; }
    public int LegalStatusId { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    public Lookup Action { get; set; }
    public Lookup FromStatus { get; set; }
    public Lookup LegalStatus { get; set; }
    public ServiceStep NextStep { get; set; }
    public Service Service { get; set; }
    public ServiceStep Step { get; set; }
    public Lookup ToStatus { get; set; }

    //public ICollection<ServiceApplicationWorkflow> ServiceApplicationWorkflow { get; set; }
    public ICollection<ServiceWorkflowInputDocument> ServiceWorkflowInputDocument { get; set; }

    public ICollection<ServiceWorkflowOutputDocument> ServiceWorkflowOutputDocument { get; set; }
    public ServiceApplication ServiceApplication { get; set; }
  }
}