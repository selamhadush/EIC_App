import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShareRoutingModule} from './share-routing.module';
import {ProjectShareListComponent} from './project-share-list/project-share-list.component';
import {SharedModule} from '@custor/modules/shared.module';
import {ProjectShareComponent} from './project-share.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ShareRoutingModule
  ],
  declarations: [ProjectShareListComponent, ProjectShareComponent],
  exports: [ProjectShareListComponent, ProjectShareComponent]
})
export class ShareModule {

}
