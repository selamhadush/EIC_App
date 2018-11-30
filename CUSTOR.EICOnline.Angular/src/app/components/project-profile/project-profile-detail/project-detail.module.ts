import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {ProjectDetailRoutingModule} from './project-detail-routing.module';
import {ProjectProfileDetailComponent} from './project-profile-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectDetailRoutingModule],
  declarations: [ProjectProfileDetailComponent],
  exports: [ProjectProfileDetailComponent]
})
export class ProjectDetailModule {

}
