import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProjectRawMaterialListComponent} from './project-raw-material-list.component';

const rawRoute: Routes = [
  {path: '', component: ProjectRawMaterialListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(rawRoute)],
  exports: [RouterModule]
})
export class RawMaterialRoutingModule {

}
