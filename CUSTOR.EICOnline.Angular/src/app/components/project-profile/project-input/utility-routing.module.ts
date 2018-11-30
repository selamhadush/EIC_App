import {RouterModule, Routes} from '@angular/router';
import {ProjectUtilityListComponent} from './project-utility-list/project-utility-list.component';
import {NgModule} from '@angular/core';

const utilityRoute: Routes = [
  {path: '', component: ProjectUtilityListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(utilityRoute)],
  exports: [RouterModule]
})
export class UtilityRoutingModule {

}
