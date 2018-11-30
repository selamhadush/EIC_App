import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { LoginControlComponent } from './login-control.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: 'login-dialog.component.html',
  styleUrls: ['login-dialog.component.scss']
})
export class LoginDialogComponent implements AfterViewInit {
  @ViewChild(LoginControlComponent)
  loginControl: LoginControlComponent;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngAfterViewInit() {
    this.loginControl.modalClosedCallback = () => this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}