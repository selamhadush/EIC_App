using System.Threading.Tasks;
using CUSTOR.Security;
using Microsoft.AspNetCore.Authorization;

namespace CUSTOR.EICOnline.API.Authorization
{
    public class ManagementServicesAuthorizationRequirement : IAuthorizationRequirement
    {
        public ManagementServicesAuthorizationRequirement(string operationName)
        {
            OperationName = operationName;
        }

        public string OperationName { get; }
    }

    public class
        ViewReadOnlyDataAuthorizationHandler : AuthorizationHandler<ManagementServicesAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            ManagementServicesAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User.IsInRole("EIC Management") &&
                context.User.HasClaim(ClaimConstants.Permission, ApplicationPermissions.ViewReadOnlyData))
                context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }
}