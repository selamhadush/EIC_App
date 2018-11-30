import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';

import { EditUserDialogComponent } from './edit-user-dialog.component';
import { fadeInOut } from '../../../@custor/services/animations';
import { User } from '../../model/security/user.model';
import { Role } from '../../model/security/role.model';
import { ToastrService } from 'ngx-toastr';
import { AppTranslationService } from '../../../@custor/services/translation.service';
import { AccountService } from '../../../@custor/services/security/account.service';
import { Utilities } from '../../../@custor/helpers/utilities';
import { Permission } from '../../model/security/permission.model';
import { AuthService } from '../../../@custor/services/security/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [fadeInOut]
})
export class UserListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['tin', 'userName', 'fullName', 'email'];
  dataSource: MatTableDataSource<User>;
  sourceUser: User;
  loadingIndicator: boolean;
  allRoles: Role[] = [];

  constructor(
    private alertService: ToastrService,
    private translationService: AppTranslationService,
    private accountService: AccountService,
    private snackBar: MatSnackBar, private authService: AuthService,
    private dialog: MatDialog, private router: Router) {
    if (this.canManageUsers) {
      this.displayedColumns.push('actions');
    }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    if (!this.canManageUsers) {
      this.router.navigate(['denied']);
    }
    this.loadData();
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

  private updateUsers(user: User) {
    if (this.sourceUser) {
      Object.assign(this.sourceUser, user);
      this.alertService.info(`Changes to user \"${user.UserName}\" was saved successfully`, 'Success');
      this.sourceUser = null;
    } else {
      this.dataSource.data.push(user);
      this.refresh();
      this.alertService.info(`User \"${user.UserName}\" was created successfully`, 'Success');
    }
  }

  private loadData() {
    this.loadingIndicator = true;
    if (this.canAssignRoles) {
      this.accountService.getUsersAndRoles().subscribe(
        results => this.onDataLoadSuccessful(results[0], results[1]),
        error => this.onDataLoadFailed(error)
      );
    } else {
      this.accountService.getUsers().subscribe(
        users => this.onDataLoadSuccessful(users, this.accountService.currentUser.Roles.map(r => new Role(r))),
        error => this.onDataLoadFailed(error)
      );
    }
  }

  private onDataLoadSuccessful(users: User[], roles: Role[]) {
    this.loadingIndicator = false;
    console.log(users);
    const ADMIN_ROLE = 'Site Administrators'; // check case sensitivity
    if (!this.canManageAdmins) {
      users = users.filter((item) => {
        return item.SiteCode === this.currentUser.SiteCode;
      });
    } else {
      users = users.filter((item) => {
        return (item.Roles.includes (ADMIN_ROLE) );
      });
    }
    this.dataSource.data = users;
    // this.dataSource.data.filter=th
    this.allRoles = roles;
  }

  private onDataLoadFailed(error: any) {
    this.loadingIndicator = false;
    this.alertService.error(`Unable to retrieve users from the server.\r\nErrors: "${Utilities.getHttpResponseMessage(error)}"`,
      'Load Error');
  }

  private editUser(user?: User) {
    this.sourceUser = user;

    const dialogRef = this.dialog.open(EditUserDialogComponent,
      {
        panelClass: 'mat-dialog-lg',
        data: { user: user, roles: [...this.allRoles] }
      });
    dialogRef.afterClosed().subscribe(user => {
      if (user) {
        this.updateUsers(user);
      }
    });
  }

  private confirmDelete(user: User) {
    this.snackBar.open(`Delete ${user.UserName}?`, 'DELETE', { duration: 5000 })
      .onAction().subscribe(() => {
        this.loadingIndicator = true;

        this.accountService.deleteUser(user)
          .subscribe(results => {
            this.loadingIndicator = false;
            this.dataSource.data = this.dataSource.data.filter(item => item !== user);
          },
            error => {
              this.loadingIndicator = false;
              // tslint:disable-next-line:max-line-length
              this.alertService.error(`An error occured whilst deleting the user.\r\nError: "${Utilities.getHttpResponseMessage(error)}"`,
                'Delete Error');
            });
      });
  }

  get canManageAdmins() {
    return this.accountService.userHasPermission(Permission.manageSiteAdministratorsPermission);
  }

  get canManageUsers() {
    return this.accountService.userHasPermission(Permission.manageUsersPermission);
  }

  get canViewRoles() {
    return this.accountService.userHasPermission(Permission.viewRolesPermission);
  }

  get canAssignRoles() {
    return this.accountService.userHasPermission(Permission.assignRolesPermission);
  }
  get currentUser() {
    return this.authService.currentUser;
  }
}
