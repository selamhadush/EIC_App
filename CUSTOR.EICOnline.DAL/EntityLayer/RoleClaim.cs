using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class RoleClaim
  {
    public int Id { get; set; }
    public int RoleId { get; set; }
    public string ClaimType { get; set; }
    public string ClaimValue { get; set; }
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

    public Role Role { get; set; }
  }
}