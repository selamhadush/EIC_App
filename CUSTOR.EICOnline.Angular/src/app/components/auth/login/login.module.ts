import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {LoginDialogComponent} from './login-dialog.component';
import {LoginComponent} from './login.component';
import {LoginControlComponent} from './login-control.component';
import {LoginRoutingModule} from './login-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    LoginRoutingModule
  ],
  declarations: [
    // LoginDialogComponent,
    // LoginComponent,
    // LoginControlComponent,
  ]
})
export class LoginModule {
}