import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
import {EditComponent} from './edit/edit.component';
import {ServicesComponent} from './services.component';

const ServiceRoutes: Routes = [
  {
    path: '', component: ServicesComponent,
    children: [
      {path: 'edit/:id', component: EditComponent},
      {path: 'list', component: ListComponent}
      /* ,      {path: 'edit/:descEng/:serviceId', component: EditServiceComponent}*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ServiceRoutes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule {
}