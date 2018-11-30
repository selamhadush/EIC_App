import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OfficerDashboardComponent} from './officer-dashboard.component';

const routes: Routes = [
  {path: '', component: OfficerDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficerDashboardRoutingModule {

}
