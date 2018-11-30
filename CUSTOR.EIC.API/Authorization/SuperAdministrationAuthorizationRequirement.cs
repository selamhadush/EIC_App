using System.Threading.Tasks;
using CUSTOR.Security;
using Microsoft.AspNetCore.Authorization;

namespace CUSTOR.Authorization
{
    public class SuperAdministrationAuthorizationRequirement : IAuthorizationRequirement
    {
        public SuperAdministrationAuthorizationRequirement(string operationName)
        {
            OperationName = operationName;
        }

        public string OperationName { get; }
    }

    public class
        ManageSettingsAuthorizationHandler : AuthorizationHandler<SuperAdministrationAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            SuperAdministrationAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User.IsInRole("Super Administrators") &&
                context.User.HasClaim(ClaimConstants.Permission, ApplicationPermissions.ManageSettings))
                context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }

    public class
        ManageLookupsAuthorizationHandler : AuthorizationHandler<SuperAdministrationAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            SuperAdministrationAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User.IsInRole("Super Administrators") &&
                context.User.HasClaim(ClaimConstants.Permission, ApplicationPermissions.ManageLookups))
                context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }

    public class
        ManageSiteAdministratorsAuthorizationHandler : AuthorizationHandler<SuperAdministrationAuthorizationRequirement,
            string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            SuperAdministrationAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User.IsInRole("Super Administrators") && context.User.HasClaim(ClaimConstants.Permission,
                    ApplicationPermissions.ManageSiteAdministrators))
                context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }
}