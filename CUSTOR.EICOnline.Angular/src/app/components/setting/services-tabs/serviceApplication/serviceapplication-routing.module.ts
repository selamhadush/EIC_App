import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServiceapplicationComponent} from './serviceapplication.component';
import {ListServiceapplicationComponent} from './list/list-serviceapplication.component';

const routes: Routes = [{
  path: 'serviceapplication',
  component: ServiceapplicationComponent,
  children: [
    {path: 'list', component: ListServiceapplicationComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceapplicationRoutingModule {
}