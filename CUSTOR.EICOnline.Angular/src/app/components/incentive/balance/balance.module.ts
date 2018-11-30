import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {BalanceRoutingModule} from './balance-routing.module';
import {BalanceComponent} from './balance.component';
import {ServiceConfirmationModule} from '../../project-profile/service-confirmation/ServiceConfirmation.module';
import {LetterModule} from '../../project-profile/letter/letter.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BalanceRoutingModule,
    ServiceConfirmationModule,
    LetterModule
  ],
  declarations: [
    BalanceComponent
  ],
  exports: [
    BalanceComponent
  ]
})
export class BalanceModule {

}
