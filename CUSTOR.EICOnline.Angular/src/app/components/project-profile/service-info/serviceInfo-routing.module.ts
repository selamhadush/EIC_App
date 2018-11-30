import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceInfoComponent } from './service-info.component';

const routes: Routes = [
  { path: '', component: ServiceInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceInfoRoutingModule {
}