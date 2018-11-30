using System;
using System.Collections.Generic;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class Document
  {
    public Document()
    {
      DataChangeRequestDocument = new HashSet<DataChangeRequestDocument>();
      DocumentVersion = new HashSet<DocumentVersion>();
      IncentiveRequestDocument = new HashSet<IncentiveRequestDocument>();
    }

    public int DocumentId { get; set; }
    public int ServiceApplicationId { get; set; }
    public int ServicePrerequisiteId { get; set; }
    public int DocumentTypeId { get; set; }
    public string Title { get; set; }
    public string KeyWords { get; set; }
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
    public ServicePrerequisite ServicePrerequisite { get; set; }
    public ServiceApplication ServiceApplication { get; set; }
    public ICollection<DataChangeRequestDocument> DataChangeRequestDocument { get; set; }
    public ICollection<DocumentVersion> DocumentVersion { get; set; }
    public ICollection<IncentiveRequestDocument> IncentiveRequestDocument { get; set; }
  }
}