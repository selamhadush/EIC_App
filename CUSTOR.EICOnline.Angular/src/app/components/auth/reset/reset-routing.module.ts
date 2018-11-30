import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetComponent } from './reset.component';

const route: Routes = [
  { path: '', component: ResetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class ResetRoutingModule {
}