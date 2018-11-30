import {NgModule} from '@angular/core';
import {ServicePrerequsiteRoutingModule} from './service-routing.module';

import {HttpClientModule} from '@angular/common/http';

import {ServicePreRequisiteComponent} from './service.component';
import {ListServiceComponent} from './list/list-service.component';
import {EditServiceComponent} from './edit/edit-service.component';
import {DatePipe} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';

@NgModule({
  declarations: [ServicePreRequisiteComponent, ListServiceComponent, EditServiceComponent],
  exports: [ServicePreRequisiteComponent, ListServiceComponent, EditServiceComponent],
  imports: [
    HttpClientModule,
    ServicePrerequsiteRoutingModule,
    SharedModule],
  providers: [DatePipe],
  // bootstrap: [ServiceComponent]
})
export class ServicePrerequsiteModule {
}