using System;
using System.Collections.Generic;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class DataChangeRequest
  {
    public DataChangeRequest()
    {
      DataChangeRequestDocument = new HashSet<DataChangeRequestDocument>();
    }

    public int DataChangeRequestId { get; set; }
    public int ServiceApplicationId { get; set; }
    public int ChangeTypeId { get; set; }
    public string ChangeFrom { get; set; }
    public string ChangeTo { get; set; }
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

    public Lookup ChangeType { get; set; }
    public ServiceApplication ServiceApplication { get; set; }
    public ICollection<DataChangeRequestDocument> DataChangeRequestDocument { get; set; }
  }
}