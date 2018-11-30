import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@custor/modules/shared.module';
import { ServiceInfoRoutingModule } from './serviceInfo-routing.module';
import { ServiceInfoComponent } from './service-info.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ServiceInfoRoutingModule
  ],
  exports: [ServiceInfoComponent],
  declarations: [ServiceInfoComponent]
})
export class ServiceInfoModule {
}