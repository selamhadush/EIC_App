import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListServiceComponent} from './list/list-service.component';
import {EditServiceComponent} from './edit/edit-service.component';
import { ServicePreRequisiteComponent} from './service.component';

const ServiceRoutes: Routes = [
  {
    path: '', component: ServicePreRequisiteComponent,
    children: [
      {path: 'edit/:id', component: EditServiceComponent},
      {path: 'list', component: ListServiceComponent}
      /* ,      {path: 'edit/:descEng/:serviceId', component: EditServiceComponent}*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ServiceRoutes)],
  exports: [RouterModule]
})
export class ServicePrerequsiteRoutingModule {
}