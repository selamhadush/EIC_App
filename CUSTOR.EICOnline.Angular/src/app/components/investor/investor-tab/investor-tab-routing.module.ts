import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {InvestorTabComponent} from './investor-tab.component';

const route: Routes = [
  {
    path: '',
    component: InvestorTabComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class InvestorTabRoutingModule {
}
