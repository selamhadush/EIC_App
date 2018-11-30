import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ServicestepperRoutingModule} from './servicestepper-routing.module';
import {ListServicestepperComponent} from './list/list-servicestepper.component';
import {EditServicestepperComponent} from './edit/edit-servicestepper.component';
import {ServicestepperComponent} from './servicestepper.component';
import {SharedModule} from '@custor/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ServicestepperRoutingModule,
    SharedModule
  ],
  declarations: [ListServicestepperComponent, EditServicestepperComponent, ServicestepperComponent],
  exports: [ListServicestepperComponent, EditServicestepperComponent, ServicestepperComponent]
})
export class ServicestepperModule {
}