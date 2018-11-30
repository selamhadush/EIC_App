import {SharedModule} from '@custor/modules/shared.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CapitalRegistrationComponent} from './capital-registration.component';
import {CapitalRegistrationRoutingModule} from './capitalRegistration-routing.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CapitalRegistrationRoutingModule
  ],
  declarations: [CapitalRegistrationComponent],
  exports: [CapitalRegistrationComponent]
})
export class CapitalRegistrationModule {
}
