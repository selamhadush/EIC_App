import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ServiceapplicationRoutingModule} from './serviceapplication-routing.module';
import {ListServiceapplicationComponent} from './list/list-serviceapplication.component';
import {ServiceapplicationComponent} from './serviceapplication.component';
import {SharedModule} from '@custor/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ServiceapplicationRoutingModule,
    SharedModule
  ],
  declarations: [ListServiceapplicationComponent, ServiceapplicationComponent],
  exports: [ListServiceapplicationComponent, ServiceapplicationComponent]
})
export class ServiceapplicationModule {
}