import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IncentiveTabComponent} from './incentive-tab.component';

const routes: Routes = [
  {path: '', component: IncentiveTabComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncentiveTabRoutingModule {

}
