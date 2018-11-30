import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleListComponent } from './roles/role-list.component';

const route: Routes = [
  { path: '', component: RoleListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class RoleRoutingModule {
}