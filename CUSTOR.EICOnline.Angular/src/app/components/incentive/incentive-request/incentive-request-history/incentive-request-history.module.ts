import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IncentiveRequestHistoryComponent} from './incentive-request-history.component';
import {SharedModule} from '@custor/modules/shared.module';
import {IncentiveRequestHistoryRoutingModule} from './incentive-request-history-routing.module';

@NgModule({
  imports: [
    CommonModule, SharedModule, IncentiveRequestHistoryRoutingModule],
  declarations: [IncentiveRequestHistoryComponent],
  exports: [IncentiveRequestHistoryComponent]
})
export class IncentiveRequestHistoryModule {
}
