import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IncentiveRequestTabComponent} from './incentive-request-tab/incentive-request-tab.component';

const routes: Routes = [
  {path: '', component: IncentiveRequestTabComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncentiveRequestRoutingModule { }
