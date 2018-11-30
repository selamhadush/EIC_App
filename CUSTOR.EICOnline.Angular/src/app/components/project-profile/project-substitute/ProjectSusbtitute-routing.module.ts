import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SubstituteTabComponent} from './substitute-tab/substitute-tab.component';

const routes: Routes = [
  {path: '', component: SubstituteTabComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectSusbtituteRoutingModule {

}
