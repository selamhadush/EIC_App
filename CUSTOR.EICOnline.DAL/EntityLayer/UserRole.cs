using System;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class UserRole
  {
    public int UserId { get; set; }
    public int RoleId { get; set; }
    public Guid? ObjectId { get; set; }
    public string Description { get; set; }
    public bool? IsActive { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedDate { get; set; }
    public int CreatedBy { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public int? UpdatedBy { get; set; }

    public Role Role { get; set; }
    public User User { get; set; }
  }
}