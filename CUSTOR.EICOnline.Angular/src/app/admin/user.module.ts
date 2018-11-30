import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './users/user-list.component';
import {EditUserDialogComponent} from './users/edit-user-dialog.component';
import {SharedModule} from '@custor/modules/shared.module';
import {UserRoutingModule} from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    UserListComponent,
    EditUserDialogComponent,
  ],
  entryComponents: [
    EditUserDialogComponent,

  ]
})
export class UserModule {
}