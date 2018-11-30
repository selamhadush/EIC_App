using System;
using System.Collections.Generic;

namespace CUSTOR.EICOnline.DAL.EntityLayer
{
  public partial class User
  {
    public User()
    {
      UserClaim = new HashSet<UserClaim>();
      UserLogin = new HashSet<UserLogin>();
      UserRole = new HashSet<UserRole>();
      UserToken = new HashSet<UserToken>();
    }

    public int Id { get; set; }
    public string UserName { get; set; }
    public string NormalizedUserName { get; set; }
    public string Email { get; set; }
    public string NormalizedEmail { get; set; }
    public bool EmailConfirmed { get; set; }
    public string PasswordHash { get; set; }
    public string SecurityStamp { get; set; }
    public string ConcurrencyStamp { get; set; }
    public string PhoneNumber { get; set; }
    public bool PhoneNumberConfirmed { get; set; }
    public bool TwoFactorEnabled { get; set; }
    public DateTimeOffset? LockoutEnd { get; set; }
    public bool LockoutEnabled { get; set; }
    public int AccessFailedCount { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool AcceptedTermsOfUse { get; set; }
    public bool SubscribedToNewsletter { get; set; }
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

    public ICollection<UserClaim> UserClaim { get; set; }
    public ICollection<UserLogin> UserLogin { get; set; }
    public ICollection<UserRole> UserRole { get; set; }
    public ICollection<UserToken> UserToken { get; set; }
  }
}