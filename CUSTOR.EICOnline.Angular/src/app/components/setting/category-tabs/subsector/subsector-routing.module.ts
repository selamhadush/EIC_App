import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSubsectorComponent } from './edit/edit-subsector.component';
import { ListSubsectorComponent } from './list/list-subsector.component';
import { SubsectorComponent } from './subsector.component';

const SubSectorroutes: Routes = [{
  path: '', component: SubsectorComponent, children: [
    { path: '', component: ListSubsectorComponent },
    { path: 'list', component: ListSubsectorComponent },
    { path: 'edit/:id', component: EditSubsectorComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(SubSectorroutes)],
  exports: [RouterModule]
})
export class SubsectorRoutingModule {
}