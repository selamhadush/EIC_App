import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Permission } from '../../model/security/permission.model';
import { Role } from '../../model/security/role.model';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../@custor/services/security/account.service';
import {SitesService} from '../../components/setting/othe-tabs/site/site.service';
import { SiteModel } from '../../model/Site.model';

@Component({
  selector: 'role-editor',
  templateUrl: './role-editor.component.html',
  styleUrls: ['./role-editor.component.scss']
})
export class RoleEditorComponent implements OnChanges {
  @ViewChild('form')
  private form: NgForm;

  selectedPermissions: SelectionModel<Permission>;
  private isNewRole = false;
  private isSaving: boolean;
  private onRoleSaved = new Subject<Role>();

  @Input() role: Role = new Role();
  @Input() allPermissions: Permission[] = [];

  roleForm: FormGroup;
  roleSaved$ = this.onRoleSaved.asObservable();
  sites: SiteModel[] = [];

  get name() {
    return this.roleForm.get('name');
  }

  constructor(
    private alertService: ToastrService,
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    this.selectedPermissions = new SelectionModel<Permission>(true, []);
    // alert ( this.selectedPermissions.hasValue);
    // console.log ("has-" + this.selectedPermissions.hasValue);
  }

  ngOnChanges() {
    if (this.role) {
      this.isNewRole = false;
    } else {
      this.isNewRole = true;
      this.role = new Role();
    }

    this.resetForm();
  }

  public save() {
    if (!this.form.submitted) {
      this.form.onSubmit(null);
      return;
    }

    if (!this.roleForm.valid) {
      return;
    }

    this.isSaving = true;
    const editedRole = this.getEditedRole();

    if (this.isNewRole) {
      this.accountService.newRole(editedRole).subscribe(
        role => this.saveSuccessHelper(role),
        error => this.saveFailedHelper(error));
    } else {
      this.accountService.updateRole(editedRole).subscribe(
        response => this.saveSuccessHelper(editedRole),
        error => this.saveFailedHelper(error));
    }
  }

  private getEditedRole(): Role {
    const formModel = this.roleForm.value;

    return {
      Id: this.role.Id,
      Name: formModel.name,
      Description: formModel.description,
      Permissions: this.selectedPermissions.selected,
      UsersCount: 0
    };
  }

  private saveSuccessHelper(role?: Role) {
    this.isSaving = false;
    if (this.isNewRole) {
      this.alertService.success(`Role \"${role.Name}\" was created successfully`, 'Success');
    } else {
      this.alertService.success(`Changes to role \"${role.Name}\" was saved successfully`,
        'success');
    }
    if (!this.isNewRole) {
      if (this.accountService.currentUser.Roles.some(r => r === this.role.Name)) {
        this.refreshLoggedInUser();
      }

      role.UsersCount = this.role.UsersCount;
    }

    this.onRoleSaved.next(role);
  }

  private refreshLoggedInUser() {
    this.accountService.refreshLoggedInUser()
      .subscribe(user => {
      },
        error => {
          this.alertService.error('An error occured whilst refreshing logged in user information from the server',
            'Refresh failed');
        });
  }

  private saveFailedHelper(error: any) {
    this.isSaving = false;
    this.alertService.error('The below errors occured whilst saving your changes:', 'Save Error');
    this.alertService.error(null, error);
  }

  private cancel() {
    this.resetForm();
  }

  private selectAll() {
    this.selectedPermissions.select(...this.allPermissions);
  }

  private toggleGroup(groupName: string) {
    let firstMemberValue: boolean;

    // tslint:disable-next-line:no-unused-expression
    this.selectedPermissions.selected; // ???? to-do

    const permissions = this.allPermissions
      .filter(p => p.GroupName === groupName);

    if (permissions.length) {
      if (this.selectedPermissions.isSelected(permissions[0])) {
        this.selectedPermissions.deselect(...permissions);
      } else {
        this.selectedPermissions.select(...permissions);
      }
    }
  }

  private buildForm() {
    this.roleForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ''
    });
  }

  private resetForm(replace = false) {
    this.roleForm.reset({
      name: this.role.Name || '',
      description: this.role.Description || ''
    });

    const selectePermissions = this.role.Permissions
      ? this.allPermissions.filter(x => this.role.Permissions.find(y => y.Value === x.Value))
      : [];

    this.selectedPermissions = new SelectionModel<Permission>(true, selectePermissions);
    // alert (this.selectedPermissions.selected.length);
  }

  get canManageRoles() {
    return  this.accountService.userHasPermission(Permission.manageRolesPermission);
  }
}
