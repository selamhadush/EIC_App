import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {RoleRoutingModule} from './role-routing.module';
import {RoleEditorComponent} from './roles/role-editor.component';
import {RoleListComponent} from './roles/role-list.component';
import {EditRoleDialogComponent} from './roles/edit-role-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RoleRoutingModule
  ],
  declarations: [
    RoleListComponent,
    EditRoleDialogComponent,
    RoleEditorComponent,
  ],
  entryComponents: [
    EditRoleDialogComponent
  ]
})
export class RoleModule {
}