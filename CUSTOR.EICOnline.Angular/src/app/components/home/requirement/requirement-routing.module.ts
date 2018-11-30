import { RouterModule, Routes } from '@angular/router';
import { RequirementComponent } from './requirement.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: RequirementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequirementRoutingModule {
}