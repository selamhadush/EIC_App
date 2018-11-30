using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class UserToken
  {
    public int Id { get; set; }
    public int UserId { get; set; }
    public string LoginProvider { get; set; }
    public string Name { get; set; }
    public string Value { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime EventDatetime { get; set; }
    public int CreatedUserId { get; set; }
    public string CreatedUserName { get; set; }
    public DateTime? UpdatedEventDatetime { get; set; }
    public int? UpdatedUserId { get; set; }
    public string UpdatedUserName { get; set; }
    public Guid? ObjectId { get; set; }

    public User User { get; set; }
  }
}