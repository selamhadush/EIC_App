import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DraftedApplicationComponent} from './drafted-application.component';

const routes: Routes = [
  {path: '', component: DraftedApplicationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]})
export class DraftedApplicationRoutingModule {

}
