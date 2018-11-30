using System.Threading.Tasks;
using CUSTOR.Security;
using Microsoft.AspNetCore.Authorization;

namespace CUSTOR.EICOnline.API.Authorization
{
    public class IncentiveManagementAuthorizationRequirement : IAuthorizationRequirement
    {
        public IncentiveManagementAuthorizationRequirement(string operationName)
        {
            OperationName = operationName;
        }

        public string OperationName { get; }
    }

    public class
        ManageIncentiveAssignedServicesAuthorizationHandler : AuthorizationHandler<
            IncentiveManagementAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            IncentiveManagementAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User.IsInRole("Incentive Supervisor") && context.User.HasClaim(ClaimConstants.Permission,
                    ApplicationPermissions.ManageIncentiveAssignedServices))
                context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }

    public class
        ApproveIncentiveUploadedItemsAuthorizationHandler : AuthorizationHandler<
            IncentiveManagementAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            IncentiveManagementAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User.IsInRole("Incentive Officer") && context.User.HasClaim(ClaimConstants.Permission,
                    ApplicationPermissions.ApproveIncentiveUploadedItems))
                context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }

    public class
        DispatchIncentivesServicesAuthorizationHandler : AuthorizationHandler<
            IncentiveManagementAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            IncentiveManagementAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User.IsInRole("Incentive Supervisor") && context.User.HasClaim(ClaimConstants.Permission,
                    ApplicationPermissions.DispatchIncentivesServices))
                context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }
}