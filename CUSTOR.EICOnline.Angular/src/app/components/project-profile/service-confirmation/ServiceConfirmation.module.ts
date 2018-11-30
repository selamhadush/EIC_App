import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {ServiceConfirmationComponent} from './service-confirmation.component';
import {ServiceConfirmationRoutingModule} from './ServiceConfirmation-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ServiceConfirmationRoutingModule
  ],
  exports: [ServiceConfirmationComponent],
  declarations: [ServiceConfirmationComponent]
})
export class ServiceConfirmationModule {
}