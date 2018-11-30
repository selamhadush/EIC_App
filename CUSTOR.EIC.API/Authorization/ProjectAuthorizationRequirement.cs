using System.Security.Claims;
using System.Threading.Tasks;
using CUSTOR.Security;
using EICOnline.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace EICOnline.Authorization
{
    public class ProjectAuthorizationRequirement : IAuthorizationRequirement
    {
        public ProjectAuthorizationRequirement(string operationName)
        {
            OperationName = operationName;
        }

        public string OperationName { get; }
    }

    public class ViewProjectAuthorizationHandler : AuthorizationHandler<ProjectAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            ProjectAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User == null)
                return Task.CompletedTask;

            if (context.User.HasClaim(ClaimConstants.Permission, ApplicationPermissions.ViewProjects))
                context.Succeed(requirement);

            return Task.CompletedTask;
        }

        private bool GetIsSameUser(ClaimsPrincipal user, string targetUserId)
        {
            if (string.IsNullOrWhiteSpace(targetUserId))
                return false;

            return Utilities.GetUserId(user) == targetUserId;
        }
    }

    public class ManageProjectAuthorizationHandler : AuthorizationHandler<ProjectAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            ProjectAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User == null)
                return Task.CompletedTask;

            if (context.User.HasClaim(ClaimConstants.Permission, ApplicationPermissions.ManageProjects))
                context.Succeed(requirement);

            return Task.CompletedTask;
        }

        private bool GetIsSameUser(ClaimsPrincipal user, string targetUserId)
        {
            if (string.IsNullOrWhiteSpace(targetUserId))
                return false;

            return Utilities.GetUserId(user) == targetUserId;
        }
    }
}