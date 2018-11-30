import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicestepperComponent } from './servicestepper.component';
import { ListServicestepperComponent } from './list/list-servicestepper.component';
import { EditServicestepperComponent } from './edit/edit-servicestepper.component';

const routes: Routes = [{
  path: '', component: ServicestepperComponent, children: [
    { path: '', component: ListServicestepperComponent },
    { path: 'list', component: ListServicestepperComponent },
    { path: 'edit/:id', component: EditServicestepperComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicestepperRoutingModule {
}