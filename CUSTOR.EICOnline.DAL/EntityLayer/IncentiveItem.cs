using System;
using System.Collections.Generic;
using CUSTOR.EICOnline.DAL.EntityLayer.Incentive;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class IncentiveItem
  {
    public IncentiveItem()
    {
      IncentiveRequestItem = new HashSet<IncentiveRequestItem>();
    }

    public int IncentiveItemId { get; set; }
    public string Hscode { get; set; }
    public int ItemCategoryId { get; set; }
    public string DescriptionAmharic { get; set; }
    public string DescriptionEnglish { get; set; }
    public int UnitId { get; set; }
    public bool? IsActive { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    public Lookup ItemCategory { get; set; }
    public Lookup Unit { get; set; }
    public ICollection<IncentiveRequestItem> IncentiveRequestItem { get; set; }
  }
}