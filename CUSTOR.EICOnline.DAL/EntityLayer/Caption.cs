using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class Caption
  {
    public int CaptionId { get; set; }
    public string FormName { get; set; }
    public string ControlName { get; set; }
    public string English { get; set; }
    public string Amharic { get; set; }
    public string Tigrigna { get; set; }
    public string AfanOromo { get; set; }
    public string Afar { get; set; }
    public string Somali { get; set; }
    public string Arabic { get; set; }
    public int Order { get; set; }
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
  }
}