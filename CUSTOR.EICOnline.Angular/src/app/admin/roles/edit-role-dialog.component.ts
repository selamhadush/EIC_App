import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {RoleEditorComponent} from './role-editor.component';
import {Role} from '../../model/security/role.model';
import {Permission} from '../../model/security/permission.model';
import {AccountService} from '../../../@custor/services/security/account.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: 'edit-role-dialog.component.html',
  styleUrls: ['edit-role-dialog.component.scss']
})
export class EditRoleDialogComponent implements AfterViewInit {
  @ViewChild(RoleEditorComponent)
  roleEditor: RoleEditorComponent;

  get roleName(): any {
    return this.data.role ? {name: this.data.role.Name} : null;
  }

  constructor(
    public dialogRef: MatDialogRef<RoleEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { role: Role, allPermissions: Permission[] },
    private accountService: AccountService
  ) {
  }

  ngAfterViewInit() {
    this.roleEditor.roleSaved$.subscribe(role => this.dialogRef.close(role));
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  get canManageRoles() {
    return  this.accountService.userHasPermission(Permission.manageRolesPermission);
  }
}
