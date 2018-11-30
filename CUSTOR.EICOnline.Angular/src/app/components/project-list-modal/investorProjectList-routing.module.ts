import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectListModalComponent} from './project-list-modal.component';

const route: Routes = [
  {path: '', component: ProjectListModalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class InvestorProjectListRoutingModule {

}
