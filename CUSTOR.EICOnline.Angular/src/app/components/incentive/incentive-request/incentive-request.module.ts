import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {IncentiveRequestRoutingModule} from './incentive-request.routing.module';
import {IncentiveRequestComponent} from './incentive-request.component';
import {IncentiveRequestTabComponent} from './incentive-request-tab/incentive-request-tab.component';
import {LetterModule} from '../../project-profile/letter/letter.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IncentiveRequestRoutingModule,
    LetterModule],
  declarations: [IncentiveRequestComponent, IncentiveRequestTabComponent],
  exports: [IncentiveRequestComponent, IncentiveRequestTabComponent]
})
export class IncentiveRequestModule {
}
