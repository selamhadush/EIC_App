import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectProfileComponent} from './project-profile.component';
import {ProjectProfileFormComponent} from './project-profile-form/project-profile-form.component';
import {ProjectStepperComponent} from './project-stepper/project-stepper.component';
import {ProjectRoutingModule} from './project-routing.module';
import {SharedModule} from '@custor/modules/shared.module';
import {ServiceInfoModule} from './service-info/serviceInfo.module';
import {ServiceConfirmationModule} from './service-confirmation/ServiceConfirmation.module';
import {ProjectDetailModule} from './project-profile-detail/project-detail.module';
import {ProjectInputOutputComponent} from './project-input/project-input-output.component';
import {ProjectCostModule} from './project-cost/ProjectCost.module';
import {ProductModule} from './project-product/product.module';
import {EmploymentModule} from './project-employment/employment.module';
import {ShareModule} from './project-share/Share.module';
import {AssociateModule} from '../investor/associate/associate.module';
import {ProjectAssociateComponent} from './project-associate/project-associate.component';
import {UtilityModule} from './project-input/utility.module';
import {ShowErrorsComponent} from '../show-errors/show-errors.component';

@NgModule({
  declarations: [
    ProjectProfileComponent,
    ProjectProfileFormComponent,

    ProjectInputOutputComponent,
    ProjectStepperComponent,
    ProjectStepperComponent,
    ProjectAssociateComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectRoutingModule,
    ServiceInfoModule,
    ServiceConfirmationModule,
    ProjectDetailModule,
    ProjectCostModule,
    EmploymentModule,
    ProductModule,
    ShareModule,
    AssociateModule,
    UtilityModule
  ]
})
export class ProjectModule {
}
