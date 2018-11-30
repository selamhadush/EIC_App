using System.Threading.Tasks;
using CUSTOR.Security;
using Microsoft.AspNetCore.Authorization;

namespace CUSTOR.EICOnline.API.Authorization
{
    public class RegistrationAndLicensingAuthorizationRequirement : IAuthorizationRequirement
    {
        public RegistrationAndLicensingAuthorizationRequirement(string operationName)
        {
            OperationName = operationName;
        }

        public string OperationName { get; }
    }

    public class
        ManageAssignedServicesAuthorizationHandler : AuthorizationHandler<
            RegistrationAndLicensingAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            RegistrationAndLicensingAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User.IsInRole("Licensing Supervisor") && context.User.HasClaim(ClaimConstants.Permission,
                    ApplicationPermissions.ManageAssignedServices))
                context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }

    public class
        ManageCustomerProfilesAuthorizationHandler : AuthorizationHandler<
            RegistrationAndLicensingAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            RegistrationAndLicensingAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User.IsInRole("Licensing Supervisor") && context.User.HasClaim(ClaimConstants.Permission,
                    ApplicationPermissions.ManageCustomerProfiles))
                context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }

    public class
        DispatchLicensingServicesAuthorizationHandler : AuthorizationHandler<
            RegistrationAndLicensingAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            RegistrationAndLicensingAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User.IsInRole("Licensing Officer") && context.User.HasClaim(ClaimConstants.Permission,
                    ApplicationPermissions.DispatchLicensingServices))
                context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }

    public class
        ManageProjectProfilesAuthorizationHandler : AuthorizationHandler<
            RegistrationAndLicensingAuthorizationRequirement, string>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            RegistrationAndLicensingAuthorizationRequirement requirement, string targetUserId)
        {
            if (context.User.IsInRole("Licensing Officer") && context.User.HasClaim(ClaimConstants.Permission,
                    ApplicationPermissions.ManageProjectProfiles))
                context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }
}