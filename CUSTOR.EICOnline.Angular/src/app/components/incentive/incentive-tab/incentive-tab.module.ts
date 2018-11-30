import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';

import {IncentiveTabComponent} from './incentive-tab.component';
import {IncentiveTabRoutingModule} from './incentive-tab-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IncentiveTabRoutingModule],
  declarations: [IncentiveTabComponent],
  exports: [IncentiveTabComponent]
})
export class IncentiveTabModule {

}
