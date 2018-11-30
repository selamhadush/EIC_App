using System.Security.Claims;
using System.Threading.Tasks;
using CUSTOR.Security;
using EICOnline.Helpers;
using Microsoft.AspNetCore.Authorization;

namespace EICOnline.Authorization
{
    public class InvestorAuthorizationRequirement : IAuthorizationRequirement
    {
        public InvestorAuthorizationRequirement(string operationName)
        {
            OperationName = operationName;
        }

        public string OperationName { get; }
    }

    public class ViewInvestorAuthorizationHandler : AuthorizationHandler<InvestorAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            InvestorAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User == null)
                return Task.CompletedTask;

            if (context.User.HasClaim(ClaimConstants.Permission, ApplicationPermissions.ViewInvestors))
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

    public class ManageInvestorAuthorizationHandler : AuthorizationHandler<InvestorAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            InvestorAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User == null)
                return Task.CompletedTask;

            if (context.User.HasClaim(ClaimConstants.Permission, ApplicationPermissions.ManageInvestors))
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