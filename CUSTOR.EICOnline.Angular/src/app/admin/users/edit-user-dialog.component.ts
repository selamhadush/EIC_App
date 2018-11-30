import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {User} from '../../model/security/user.model';
import {Role} from '../../model/security/role.model';

import {UserEditorComponent} from './user-editor.component';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: 'edit-user-dialog.component.html',
  styleUrls: ['edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements AfterViewInit {
  @ViewChild(UserEditorComponent)
  editUser: UserEditorComponent;

  get userName(): any {
    return this.data.user ? {name: this.data.user.UserName} : null;
  }

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, roles: Role[] }) {
  }

  ngAfterViewInit() {
    this.editUser.userSaved$.subscribe(user => this.dialogRef.close(user));
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}