using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class ServiceWorkflowInputDocument
  {
    public int ServiceWorkflowInputDocumentId { get; set; }
    public int ServiceWorkflowId { get; set; }
    public int DocumentTypeId { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    public Lookup DocumentType { get; set; }
    public ServiceWorkflow ServiceWorkflow { get; set; }
  }
}