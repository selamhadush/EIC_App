import {RouterModule, Routes} from '@angular/router';
import {ProjectEmploymentListComponent} from './project-employment-list/project-employment-list.component';
import {NgModule} from '@angular/core';
import {ProjectEmploymentComponent} from './project-employment.component';

const emRoutes: Routes = [
  {path: '', component: ProjectEmploymentListComponent},
  {path: ':id', component: ProjectEmploymentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(emRoutes)],
  exports: [RouterModule]
})
export class EmploymentRoutingModule {

}
