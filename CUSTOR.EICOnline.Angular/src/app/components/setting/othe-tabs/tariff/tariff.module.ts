import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TariffRoutingModule} from './tariff-routing.module';
import {EditTariffComponent} from './edit/edit-tariff.component';
import {ListTariffComponent} from './list/list-tariff.component';
import {TariffComponent} from './tariff.component';
import {SharedModule} from '../../../../../@custor/modules/shared.module';

@NgModule({
  declarations: [
    TariffComponent,
    EditTariffComponent,
    ListTariffComponent
  ],
  exports: [
    TariffComponent,
    EditTariffComponent,
    ListTariffComponent
  ],
  imports: [
    CommonModule,
    TariffRoutingModule,
    SharedModule],
  // providers: [DatePipe],
  // bootstrap: [TariffComponent]
})
export class TariffModule {
}