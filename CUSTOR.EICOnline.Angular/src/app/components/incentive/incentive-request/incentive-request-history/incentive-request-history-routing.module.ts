import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IncentiveRequestHistoryComponent} from './incentive-request-history.component';

const routes: Routes = [
  {path: '', component: IncentiveRequestHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncentiveRequestHistoryRoutingModule {
}
