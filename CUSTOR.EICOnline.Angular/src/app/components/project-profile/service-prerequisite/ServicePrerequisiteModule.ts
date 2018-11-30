import {NgModule} from '@angular/core';
import {ServicePrerequisiteComponent} from './service-prerequisite.component';
import {ServicePrerequsiteRoutingModule} from '../../setting/services-tabs/serviceprerequistie/service-routing.module';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ServicePrerequsiteRoutingModule],
  declarations: [ServicePrerequisiteComponent],
  exports: [ServicePrerequisiteComponent]
})
export class ServicePrerequisiteModule {
}
