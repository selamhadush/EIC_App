import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceConfirmationComponent } from './service-confirmation.component';

const routes: Routes = [
  { path: '', component: ServiceConfirmationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceConfirmationRoutingModule {
}