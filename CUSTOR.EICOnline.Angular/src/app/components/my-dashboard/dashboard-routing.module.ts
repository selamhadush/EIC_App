import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyDashboardComponent } from './my-dashboard.component';

const route: Routes = [
  { path: '', component: MyDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}