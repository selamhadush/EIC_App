﻿using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CUSTOR.Security;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;

namespace EICOnline.Authorization
{
    public class ProfileService : IProfileService
    {
        private readonly IUserClaimsPrincipalFactory<ApplicationUser> _claimsFactory;
        private readonly UserManager<ApplicationUser> _userManager;

        public ProfileService(UserManager<ApplicationUser> userManager,
            IUserClaimsPrincipalFactory<ApplicationUser> claimsFactory)
        {
            _userManager = userManager;
            _claimsFactory = claimsFactory;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            try
            {
                var sub = context.Subject.GetSubjectId();
                var user = await _userManager.FindByIdAsync(sub);
                var principal = await _claimsFactory.CreateAsync(user);

                var claims = principal.Claims.ToList();
                claims = claims.Where(claim => context.RequestedClaimTypes.Contains(claim.Type)).ToList();

                if (user.Tin != null)
                    claims.Add(new Claim(PropertyConstants.TIN, user.Tin));
                if (user.SiteCode != null)
                    claims.Add(new Claim(PropertyConstants.SiteCode, user.SiteCode));
                if (user.FullName != null)
                    claims.Add(new Claim(PropertyConstants.FullName, user.FullName));

                if (user.Configuration != null)
                    claims.Add(new Claim(PropertyConstants.Configuration, user.Configuration));

                context.IssuedClaims = claims;
            }
            catch (Exception ex)
            {
                var s = ex.Message;
                throw new Exception(ex.Message);
            }
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = await _userManager.FindByIdAsync(sub);

            context.IsActive = user != null && user.IsEnabled;
        }
    }
}