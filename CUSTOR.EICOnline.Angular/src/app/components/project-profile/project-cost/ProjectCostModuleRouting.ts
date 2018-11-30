import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectCostListComponent} from './project-cost-list/project-cost-list.component';
import {ProjectCostComponent} from './project-cost.component';

const costRoute: Routes = [
  {path: '', component: ProjectCostListComponent},
  {path: ':id', component: ProjectCostComponent},

];

@NgModule({
  imports: [RouterModule.forChild(costRoute)],
  exports: [RouterModule]
})
export class ProjectCostModuleRouting {


}
