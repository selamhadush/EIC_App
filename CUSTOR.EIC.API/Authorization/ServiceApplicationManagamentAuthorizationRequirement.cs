using System.Threading.Tasks;
using CUSTOR.Security;
using Microsoft.AspNetCore.Authorization;

namespace CUSTOR.EICOnline.API.Authorization
{
    public class ServiceApplicationManagamentAuthorizationRequirement : IAuthorizationRequirement
    {
        public ServiceApplicationManagamentAuthorizationRequirement(string operationName)
        {
            OperationName = operationName;
        }

        public string OperationName { get; }
    }

    public class
        ManageServiceApplicationAuthorizationHandler : AuthorizationHandler<
            ServiceApplicationManagamentAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            ServiceApplicationManagamentAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User.IsInRole("Service Application Management") &&
                context.User.HasClaim(ClaimConstants.Permission, ApplicationPermissions.ManageServiceApplication))
                context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }

    public class
        ViewServiceApplicationAuthorizationHandler : AuthorizationHandler<
            ServiceApplicationManagamentAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            ServiceApplicationManagamentAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User.IsInRole("Service Application Management") &&
                context.User.HasClaim(ClaimConstants.Permission, ApplicationPermissions.ViewServiceRequests))
                context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }
}