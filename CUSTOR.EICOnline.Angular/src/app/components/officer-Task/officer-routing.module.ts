import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficerStepperComponent } from './officer-stepper.component';

const routes: Routes = [
  {
    path: '', component: OfficerStepperComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficerRoutingModule {
}