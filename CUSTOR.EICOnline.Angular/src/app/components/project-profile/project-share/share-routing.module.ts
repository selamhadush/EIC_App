import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectShareListComponent} from './project-share-list/project-share-list.component';
import {ProjectShareComponent} from './project-share.component';

const shareRoutes: Routes = [
  {path: '', component: ProjectShareListComponent},
  {path: ':id', component: ProjectShareComponent}
];

@NgModule({
  imports: [RouterModule.forChild(shareRoutes)],
  exports: [RouterModule]
})
export class ShareRoutingModule {

}
