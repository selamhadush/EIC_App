import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePasswordComponent } from './manage.component';

const route: Routes = [
  { path: '', component: ManagePasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class ManagePasswordRoutingModule {
}