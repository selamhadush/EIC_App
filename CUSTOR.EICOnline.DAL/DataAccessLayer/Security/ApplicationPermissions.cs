using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace CUSTOR.Security
{
  public static class ApplicationPermissions
  {
    public static ReadOnlyCollection<ApplicationPermission> AllPermissions;

    public const string InvestorProfilePermissionGroupName = "Investor Profile Permissions";
    public static ApplicationPermission ViewInvestors = new ApplicationPermission("View Investors", "investors.view", InvestorProfilePermissionGroupName, "Permission to view investor profile details");
    public static ApplicationPermission ManageInvestors = new ApplicationPermission("Manage Investors", "investors.manage", InvestorProfilePermissionGroupName, "Permission to create, delete and modify investor details");

    public const string UsersPermissionGroupName = "User Permissions";
    public static ApplicationPermission ViewUsers = new ApplicationPermission("View Users", "users.view", UsersPermissionGroupName, "Permission to view other users account details");
    public static ApplicationPermission ManageUsers = new ApplicationPermission("Manage Users", "users.manage", UsersPermissionGroupName, "Permission to create, delete and modify other users account details");

    public const string RolesPermissionGroupName = "Role Permissions";
    public static ApplicationPermission ViewRoles = new ApplicationPermission("View Roles", "roles.view", RolesPermissionGroupName, "Permission to view available roles");
    public static ApplicationPermission ManageRoles = new ApplicationPermission("Manage Roles", "roles.manage", RolesPermissionGroupName, "Permission to create, delete and modify roles");
    public static ApplicationPermission AssignRoles = new ApplicationPermission("Assign Roles", "roles.assign", RolesPermissionGroupName, "Permission to assign roles to users");


    public const string ProjectPermissionGroupName = "Project List Permissions";
    public static ApplicationPermission ViewProjects = new ApplicationPermission("View Projects", "projects.view", ProjectPermissionGroupName, "Permission to view Project List");
    public static ApplicationPermission ManageProjects = new ApplicationPermission("Manage Projects", "projects.manage", ProjectPermissionGroupName, "Permission to create, delete and modify Project details");


    public const string OfficerPermissionGroupName = "Officer Tasks Permissions";
    public static ApplicationPermission ViewServiceApplication = new ApplicationPermission("View ServiceApplication", "serviceApplication.view", OfficerPermissionGroupName, "Permission to view service detail");
    public static ApplicationPermission ManageServiceApplication = new ApplicationPermission("Manage Projects", "serviceApplication.manage", OfficerPermissionGroupName, "Permission to approve, Send Message to client");

    public const string TaskDispacherPermissionGroupName = "Service Task Dispacher";
    public static ApplicationPermission ViewServiceRequests = new ApplicationPermission("View Service Requests", "task.view", TaskDispacherPermissionGroupName, "Permission to view Service Requests");
    public static ApplicationPermission ManageServiceList = new ApplicationPermission("Manage Tasks", "task.manage", TaskDispacherPermissionGroupName, "Permission to Assign Tasks to Officer");


    public const string SuperAdministrationPermissionGroupName = "Super Administration Permissions";
    public static ApplicationPermission ManageSiteAdministrators = new ApplicationPermission("Manage Site Administrators", "superadmin.manageAdmins", SuperAdministrationPermissionGroupName, "Permission to manage site administrators");
    public static ApplicationPermission ManageLookups = new ApplicationPermission("Manage Static Data", "superadmin.manageLookups", SuperAdministrationPermissionGroupName, "Permission to manage sites, lookups");
    public static ApplicationPermission ManageSettings = new ApplicationPermission("Manage System Settings", "superadmin.manageSettings", SuperAdministrationPermissionGroupName, "Permission to manage configuration settings");


    public const string RegistrationAndLicensingPermissionGroupName = "Registration and Licensing Permissions";
    public static ApplicationPermission ManageAssignedServices = new ApplicationPermission("Manage Assigned Services ", "services.manage", RegistrationAndLicensingPermissionGroupName, "This permission allows Officers to respond online and onsite service requests");
    public static ApplicationPermission ManageCustomerProfiles = new ApplicationPermission("Manage Customer Profiles ", "customerProfile.manage", RegistrationAndLicensingPermissionGroupName, "Permission for managing data on EIC’s customers");
    public static ApplicationPermission ManageProjectProfiles = new ApplicationPermission("Manage Project Profiles", "projectProfile.manage", RegistrationAndLicensingPermissionGroupName, "Permission for managing data on customer projects");
    public static ApplicationPermission DispatchLicensingServices = new ApplicationPermission("Dispatch Licensing Services", "licensingServices.manage", RegistrationAndLicensingPermissionGroupName, "Permission for assigning service requests to officers");

    public const string IncentiveManagementPermissionGroupName = "Incentive Management Permission";
    public static ApplicationPermission ManageIncentiveAssignedServices = new ApplicationPermission("Manage Incentive Assigned Services ", "incentiveServices.manage", IncentiveManagementPermissionGroupName, "This permission allows Officers to respond online and onsite service requests");
    public static ApplicationPermission ApproveIncentiveUploadedItems = new ApplicationPermission("Approve Incentive Uploaded Items ", "uploadedItems.manage", IncentiveManagementPermissionGroupName, "Permission for approving list of items requested for duty free");
    public static ApplicationPermission DispatchIncentivesServices = new ApplicationPermission("Dispatch Incentives Services ", "incentivesServices.manage", IncentiveManagementPermissionGroupName, "Permission for assigning service requests to officers");


    public const string AftercarePermissionGroupName = "Aftercare Permission";
    public static ApplicationPermission ManageAftercareData = new ApplicationPermission("Manage Aftercare Data", "aftercareData.manage", AftercarePermissionGroupName, "Permission for adding and updating aftercare data");

    public const string ManagementServicesPermissionGroupName = "Management Services Permission";
    public static ApplicationPermission ViewReadOnlyData = new ApplicationPermission("View Read-only Data", "data.View", ManagementServicesPermissionGroupName, "Permission for accessing system resources in read-only mode");



    static ApplicationPermissions()
    {
      List<ApplicationPermission> allPermissions = new List<ApplicationPermission>()
            {
                ViewUsers,
                ManageUsers,

                ViewRoles,
                ManageRoles,
                AssignRoles,

                ViewInvestors,
                ManageInvestors,

                ViewProjects,
                ManageProjects,

                ManageSiteAdministrators,
                ManageLookups,
                ManageSettings,

                ViewServiceRequests,
                ManageServiceList,

             ViewServiceApplication,
             ManageServiceApplication,

             ManageAssignedServices,
             ManageCustomerProfiles,
             ManageProjectProfiles,
             DispatchLicensingServices,


             ManageIncentiveAssignedServices,
             ApproveIncentiveUploadedItems,
             DispatchIncentivesServices,

             ManageAftercareData,

             ViewReadOnlyData,


            };

      AllPermissions = allPermissions.AsReadOnly();
    }

    public static ApplicationPermission GetPermissionByName(string permissionName)
    {
      return AllPermissions.Where(p => p.Name == permissionName).FirstOrDefault();
    }

    public static ApplicationPermission GetPermissionByValue(string permissionValue)
    {
      return AllPermissions.Where(p => p.Value == permissionValue).FirstOrDefault();
    }

    public static string[] GetAllPermissionValues()
    {
      return AllPermissions.Select(p => p.Value).ToArray();
    }

    public static string[] GetAdministrativePermissionValues()
    {
      return new string[] { ManageUsers, ManageRoles, AssignRoles };
    }
  }

  public class ApplicationPermission
  {
    public ApplicationPermission()
    { }

    public ApplicationPermission(string name, string value, string groupName, string description = null)
    {
      Name = name;
      Value = value;
      GroupName = groupName;
      Description = description;
    }

    public string Name { get; set; }
    public string Value { get; set; }
    public string GroupName { get; set; }
    public string Description { get; set; }

    public override string ToString()
    {
      return Value;
    }

    public static implicit operator string(ApplicationPermission permission)
    {
      return permission.Value;
    }
  }
}