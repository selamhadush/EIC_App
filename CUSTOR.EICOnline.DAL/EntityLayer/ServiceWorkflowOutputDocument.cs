using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ServiceWorkflowOutputDocument
  {
    public int ServiceWorkflowOutputDocumentId { get; set; }
    public int ServiceWorkflowOutputId { get; set; }
    public int ServiceWorkflowId { get; set; }
    public int LetterTemplateId { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    public Lookup LetterTemplate { get; set; }
    public ServiceWorkflow ServiceWorkflow { get; set; }
  }
}