import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './users/user-list.component';

const route: Routes = [
  { path: '', component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(route)],
})
export class UserRoutingModule {
}