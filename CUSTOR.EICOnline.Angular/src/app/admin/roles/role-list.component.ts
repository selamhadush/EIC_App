import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';

import {EditRoleDialogComponent} from './edit-role-dialog.component';
import {fadeInOut} from '../../../@custor/services/animations';
import {Role} from '../../model/security/role.model';
import {Permission} from '../../model/security/permission.model';
import {ToastrService} from 'ngx-toastr';
import {AppTranslationService} from '../../../@custor/services/translation.service';
import {AccountService} from '../../../@custor/services/security/account.service';
import {Utilities} from '../../../@custor/helpers/utilities';
import {Router} from '@angular/router';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
  animations: [fadeInOut]
})
export class RoleListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['roleName', 'description', 'users', 'actions'];
  dataSource: MatTableDataSource<Role>;
  allPermissions: Permission[] = [];
  sourceRole: Role;
  editingRoleName: { name: string };
  loadingIndicator: boolean;

  constructor(
    private alertService: ToastrService,
    private translationService: AppTranslationService,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog, private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  get canManageRoles() {
    return this.accountService.userHasPermission(Permission.manageRolesPermission);
  }

  get canViewRoles() {
    return this.accountService.userHasPermission(Permission.viewRolesPermission);
  }

  get canManageAdmins() {
    return this.accountService.userHasPermission(Permission.manageSiteAdministratorsPermission);
  }


  ngOnInit() {
    this.checkAuthorization();
    this.loadData();
  }

  checkAuthorization() {
    if (!this.canManageRoles) {
      // this.alertService.error('You are not allowed to access this page');
      this.router.navigate(['denied']);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  private refresh() {
    // Causes the filter to refresh there by updating with recently added data.
    this.applyFilter(this.dataSource.filter);
  }

  private updateRoles(role: Role) {
    if (this.sourceRole) {
      Object.assign(this.sourceRole, role);
      this.sourceRole = null;
    } else {
      this.dataSource.data.push(role);
    }

    this.refresh();
  }

  private loadData() {
    this.loadingIndicator = true;

    this.accountService.getRolesAndPermissions()
      .subscribe(results => {
          this.loadingIndicator = false;
          this.dataSource.data = results[0];
          this.allPermissions = results[1];
        },
        error => {
          this.loadingIndicator = false;
          console.log(Utilities.getHttpResponseMessage(error));
          this.alertService.error(`Error - "${Utilities.getHttpResponseMessage(error)}"`,
            'Load Error');
        });
  }

  private editRole(role?: Role) {
    this.sourceRole = role;

    const dialogRef = this.dialog.open(EditRoleDialogComponent,
      {
        panelClass: 'mat-dialog-md',
        data: {role: role, allPermissions: this.allPermissions}
      });
    dialogRef.afterClosed().subscribe(role => {
      if (role && this.canManageRoles) {
        this.updateRoles(role);
      }
    });
  }

  private confirmDelete(role: Role) {
    this.snackBar.open(`Delete ${role.Name} role?`, 'DELETE', {duration: 5000})
      .onAction().subscribe(() => {
      this.loadingIndicator = true;
      this.accountService.deleteRole(role)
        .subscribe(results => {
            this.loadingIndicator = false;
            this.dataSource.data = this.dataSource.data.filter(item => item !== role);
          },
          error => {
            this.loadingIndicator = false;
            // tslint:disable-next-line:max-line-length
            this.alertService.error(`An error occured whilst deleting the role.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
              'Delete Error');
          });
    });
  }
}
