import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectCancellationTabComponent} from './project-cancellation-tab.component';

const routes: Routes = [
  {path: '', component: ProjectCancellationTabComponent},
  {path: ':id', component: ProjectCancellationTabComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectCancellationRouting {

}
