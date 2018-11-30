import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {ProjectSusbtituteRoutingModule} from './ProjectSusbtitute-routing.module';
import {ProjectSubstituteComponent} from './project-substitute.component';
import {SubstituteTabComponent} from './substitute-tab/substitute-tab.component';
import {ServiceInfoModule} from '../service-info/serviceInfo.module';
import {ServiceConfirmationModule} from '../service-confirmation/ServiceConfirmation.module';
import {OfficerModule} from '../../officer-Task/officer.module';
import {ServicePrerequisiteModule} from '../service-prerequisite/ServicePrerequisiteModule';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectSusbtituteRoutingModule,
    ServiceInfoModule,
    ServiceConfirmationModule,
    // ServicePrerequisiteModule,
    OfficerModule,
  ],
  declarations: [ProjectSubstituteComponent, SubstituteTabComponent],
  exports: [ProjectSubstituteComponent]
})
export class ProjectSubstituteModule {

}
