using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class IncentiveRequestDocument
  {
    public int IncentiveRequestDocumentId { get; set; }
    public int IncentiveRequestId { get; set; }
    public int DocumentTypeId { get; set; }
    public string Title { get; set; }
    public int DocumentId { get; set; }
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

    public Document Document { get; set; }
    public Lookup DocumentType { get; set; }
    public IncentiveRequest IncentiveRequest { get; set; }
  }
}