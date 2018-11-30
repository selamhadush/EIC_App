import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {ProjectCancellationRouting} from './project-cancellation-routing';
import {ServiceInfoModule} from '../service-info/serviceInfo.module';
import {OfficerModule} from '../../officer-Task/officer.module';
import {ServiceConfirmationModule} from '../service-confirmation/ServiceConfirmation.module';
import {ProjectCancellationTabComponent} from './project-cancellation-tab.component';
import {ProjectCancellationComponent} from './project-cancellation/project-cancellation.component';
import {LetterModule} from '../letter/letter.module';
import {ServicePrerequisiteModule} from '../service-prerequisite/ServicePrerequisiteModule';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProjectCancellationRouting,
    OfficerModule,
    ServiceConfirmationModule,
    ServiceInfoModule,
    LetterModule,
    // ServicePrerequisiteModule
  ],
  declarations: [
    ProjectCancellationTabComponent,
    ProjectCancellationComponent
  ]
})
export class ProjectCancellationTabModule {

}
