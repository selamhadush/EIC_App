import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectProfileDetailComponent} from './project-profile-detail.component';

const routes: Routes = [
  {path: '', component: ProjectProfileDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDetailRoutingModule {

}
