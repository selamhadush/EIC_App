namespace EICOnline.Authorization
{
    public class Policies
    {
        //Investor Management
        public const string ViewAllInvestorsPolicy = "View All Investors";

        public const string ManageAllInvestorsPolicy = "Manage All Investors";

        //User Managment
        public const string ViewAllUsersPolicy = "View All Users";

        public const string ManageAllUsersPolicy = "Manage All Users";

        //Role Managment
        public const string ViewAllRolesPolicy = "View All Roles";

        public const string ViewRoleByRoleNamePolicy = "View Role by RoleName";
        public const string ManageAllRolesPolicy = "Manage All Roles";
        public const string AssignAllowedRolesPolicy = "Assign Allowed Roles";

        //Project Management
        public const string ViewAllProjectsPolicy = "View All Projects";

        public const string ManageAllProjectsPolicy = "Manage All Projects";

        //Super Administration
        public const string ManageSettingsPolicy = "Manage Settings";
        public const string ManageLookupsPolicy = "Manage Lookup Data";
        public const string ManageAdministratorsPolicy = "Manage Site Administrators";

        //Task policy 
        public const string ViewTasksPolicy = "View All Service Requests";

        public const string ManageTasksPolicy = "Manage All Service Requests";

        //officer policy
        public const string ViewServiceApplicationPolicy = "View All Service Application Requests";

        public const string ManageServiceApplicationPolicy = "Manage All Service Application Requests";

        // Registration And Licensing Policy
        public const string ManageAssignedServices = "Manage Assigned Services ";
        public const string ManageCustomerProfiles = "Manage Customer Profiles";
        public const string ManageProjectProfiles = "Manage Project Profiles";
        public const string DispatchLicensingServices = "Dispatch Licensing Services";

        //Incentive Management Policy
        public const string ManageIncentiveAssignedServices = "Manage Assigned Services ";
        public const string ApproveIncentiveUploadedItems = "Approve Uploaded Items";
        public const string DispatchIncentivesServices = "Dispatch Incentives Services";


        //Aftercare Policy
        public const string ManageAftercareData = "Manage Aftercare Data";


        //Management Services Policy
        public const string ViewReadOnlyData = "View Read-only Data";
    }

  /// <summary>
  ///     Operation Policy to allow adding, viewing, updating and deleting general or specific user records.
  /// </summary>
  public static class AccountManagementOperations
    {
        public const string CreateOperationName = "Create";
        public const string ReadOperationName = "Read";
        public const string UpdateOperationName = "Update";
        public const string DeleteOperationName = "Delete";

        public static UserAccountAuthorizationRequirement Create =
            new UserAccountAuthorizationRequirement(CreateOperationName);

        public static UserAccountAuthorizationRequirement Read =
            new UserAccountAuthorizationRequirement(ReadOperationName);

        public static UserAccountAuthorizationRequirement Update =
            new UserAccountAuthorizationRequirement(UpdateOperationName);

        public static UserAccountAuthorizationRequirement Delete =
            new UserAccountAuthorizationRequirement(DeleteOperationName);
    }
}