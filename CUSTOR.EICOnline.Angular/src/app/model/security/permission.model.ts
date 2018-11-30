export type PermissionNames =
  'View Investors' | 'Manage Investors' |
  'View Users' | 'Manage Users' |
  'View Roles' | 'Manage Roles' | 'Assign Roles' |
  'View Projects' | 'Manage Projects' |
  'View Tasks' | 'Manage Tasks' |
  'View Service Application' | 'Manage Service Application' |
  'Manage Site Administrators' | 'Manage Settings' | 'Manage Lookups'
  ;

export type PermissionValues =
  'investors.view' | 'investors.manage' |
  'users.view' | 'users.manage' |
  'roles.view' | 'roles.manage' | 'roles.assign' |
  'projects.view' | 'projects.manage' |
  'task.view' | 'task.manage' |

  'services.manage' | 'services.manage' |
  'customerProfile.manage' | 'customerProfile.manage' |
  'projectProfile.manage' | 'projectProfile.manage' |
  'licensingServices.manage' | 'licensingServices.manage' |


  'incentiveServices.manage' | 'incentiveServices.manage' |
  'uploadedItems.manage' | 'uploadedItems.manage' |
  'incentivesServices.manage' | 'incentivesServices.manage' |

  'aftercareData.manage' | 'aftercareData.manage' |

  'data.View' | 'data.View' |

  'serviceApplication.view' | 'serviceApplication.manage' |
  'superadmin.manageAdmins' | 'superadmin.manageLookups' | 'superadmin.manageSettings'   ;

export class Permission {
  public static readonly viewInvestorsPermission: PermissionValues = 'investors.view';
  public static readonly manageInvestorsPermission: PermissionValues = 'investors.manage';

  public static readonly viewProjectsPermission: PermissionValues = 'projects.view';
  public static readonly manageProjectsPermission: PermissionValues = 'projects.manage';

  public static readonly viewServiceList: PermissionValues = 'task.view';
  public static readonly manageTasks: PermissionValues = 'task.manage';

  public static readonly viewServiceApplication: PermissionValues = 'serviceApplication.view';
  public static readonly manageServiceApplication: PermissionValues = 'serviceApplication.manage';

  public static readonly viewUsersPermission: PermissionValues = 'users.view';
  public static readonly manageUsersPermission: PermissionValues = 'users.manage';

  public static readonly viewRolesPermission: PermissionValues = 'roles.view';
  public static readonly manageRolesPermission: PermissionValues = 'roles.manage';
  public static readonly assignRolesPermission: PermissionValues = 'roles.assign';

  public static readonly manageSiteAdministratorsPermission: PermissionValues = 'superadmin.manageAdmins';
  public static readonly manageLookupsPermission: PermissionValues = 'superadmin.manageLookups';
  public static readonly manageSettingsPermission: PermissionValues = 'superadmin.manageSettings';

  // Registration and Licensing Permissions
  public static readonly ManageAssignedServicesPermission: PermissionValues = 'services.manage';
  public static readonly ManageCustomerProfilesPermission: PermissionValues = 'customerProfile.manage';
  public static readonly ManageProjectProfilesPermission: PermissionValues = 'projectProfile.manage';
  public static readonly DispatchLicensingServicesPermission: PermissionValues = 'licensingServices.manage';

  // Incentive Management Permission
  public static readonly ManageIncentiveAssignedServicesPermission: PermissionValues = 'incentiveServices.manage';
  public static readonly ApproveIncentiveUploadedItemsPermission: PermissionValues = 'uploadedItems.manage';
  public static readonly DispatchIncentivesServicesPermission: PermissionValues = 'incentivesServices.manage';
  // Manage Aftercare Data
  public static readonly ManageAftercareDataPermission: PermissionValues = 'aftercareData.manage';

// Management Services Permission
  public static readonly ViewReadOnlyDataPermission: PermissionValues = 'data.View';

  constructor(name?: PermissionNames, value?: PermissionValues, groupName?: string, description?: string) {
    this.Name = name;
    this.Value = value;
    this.GroupName = groupName;
    this.Description = description;
  }

  public Name: PermissionNames;
  public Value: PermissionValues;
  public GroupName: string;
  public Description: string;
}
