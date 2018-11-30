﻿using System;
using System.Collections.Generic;
using CUSTOR.EICOnline.DAL.EntityLayer;
using Microsoft.AspNetCore.Identity;

namespace CUSTOR.Security
{
  public class ApplicationUser : IdentityUser, IAuditableEntity
  {
    public virtual string FriendlyName
    {
      get
      {
        string friendlyName = string.IsNullOrWhiteSpace(FullName) ? UserName : FullName;

        //if (!string.IsNullOrWhiteSpace(TIN))
        //    friendlyName = $"{TIN} {friendlyName}";

        return friendlyName;
      }
    }

    public string Tin { get; set; }
    public string SiteCode { get; set; }
    public string FullName { get; set; }
    public string Configuration { get; set; }
    public bool IsEnabled { get; set; }
    public bool IsLockedOut => this.LockoutEnabled && this.LockoutEnd >= DateTimeOffset.UtcNow;

    public string CreatedBy { get; set; }
    public string UpdatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }

    /// <summary>
    /// Navigation property for the roles this user belongs to.
    /// </summary>
    public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }

    /// <summary>
    /// Navigation property for the claims this user possesses.
    /// </summary>
    public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; }

    /// <summary>
    /// Demo Navigation property for orders this user has processed
    /// </summary>
    //public ICollection<Order> Orders { get; set; }
  }
}