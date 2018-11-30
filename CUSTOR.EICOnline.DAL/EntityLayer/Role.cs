using System;
using System.Collections.Generic;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class Role
  {
    public Role()
    {
      RoleClaim = new HashSet<RoleClaim>();
      UserRole = new HashSet<UserRole>();
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public string NormalizedName { get; set; }
    public string ConcurrencyStamp { get; set; }
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

    public ICollection<RoleClaim> RoleClaim { get; set; }
    public ICollection<UserRole> UserRole { get; set; }
  }
}