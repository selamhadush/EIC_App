import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DraftedApplicationComponent} from '../drafted-application/drafted-application.component';
import {ArchiveApplicationComponent} from './archive-application.component';

const routes: Routes = [
  {path: '', component: ArchiveApplicationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]})
export class ArchiveApplicationRoutingModule {

}
