import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ServicetariffRoutingModule} from './servicetariff-routing.module';
import {EditServicetariffComponent} from './edit/edit-servicetariff.component';
import {ListServicetariffComponent} from './list/list-servicetariff.component';
import {ServicetariffComponent} from './servicetariff.component';
import {SharedModule} from '@custor/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ServicetariffRoutingModule,
    SharedModule
  ],
  declarations: [ServicetariffComponent, EditServicetariffComponent, ListServicetariffComponent],
  exports: [ServicetariffComponent, EditServicetariffComponent, ListServicetariffComponent]
})

export class ServicetariffModule {
}