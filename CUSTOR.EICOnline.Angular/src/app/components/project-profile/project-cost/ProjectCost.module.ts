import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {ProjectCostModuleRouting} from './ProjectCostModuleRouting';
import {ProjectCostListComponent} from './project-cost-list/project-cost-list.component';
import {ProjectCostComponent} from './project-cost.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectCostModuleRouting
  ],
  declarations: [ProjectCostListComponent,
    ProjectCostComponent],
  exports: [ProjectCostListComponent, ProjectCostComponent]

})
export class ProjectCostModule {

}
