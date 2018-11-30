import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditServicetariffComponent} from './edit/edit-servicetariff.component';
import {ListServicetariffComponent} from './list/list-servicetariff.component';
import {ServicetariffComponent} from './servicetariff.component';

const ServiceTariffRoutes: Routes = [
  {
    path: '', component: ServicetariffComponent,
    children: [
      {path: '', component: ListServicetariffComponent},
      {path: 'list', component: ListServicetariffComponent},
      {path: 'edit/:id', component: EditServicetariffComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ServiceTariffRoutes)],
  exports: [RouterModule]
})
export class ServicetariffRoutingModule {
}