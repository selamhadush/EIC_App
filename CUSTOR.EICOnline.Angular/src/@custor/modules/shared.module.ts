import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {TranslateModule} from '@ngx-translate/core';
import {AngMaterialModule} from '../../@custor/modules/material.module';
import {AngConfirmDialogComponent} from '../../@custor/components/confirm-dialog/confirm-dialog.component';
import {PageHeaderComponent} from '../components/shared/page-header.component';
import {UserEditorComponent} from '../../app/admin/users/user-editor.component';
import {AppDialogComponent} from '../components/app-dialog/app-dialog.component';
import {GroupByPipe} from '../pipes/group-by.pipe';
import {CommonModule} from '@angular/common';
import {CountryPipe} from '../../app/pipe/country-pipe.pipe';
import {RegionPipePipe} from '../../app/pipe/region-pipe.pipe';
import {ZonePipePipe} from '../../app/pipe/zone-pipe.pipe';
import {FilterPipePipe} from '../../app/pipe/filter-pipe.pipe';
import {WoredaPipePipe} from '../../app/pipe/woreda-pipe.pipe';
import {HttpClientModule} from '@angular/common/http';
import {EnabledControlDirective} from '../../app/directive/enabled-control.directive';
import {ServicePrerequisiteComponent} from '../../app/components/project-profile/service-prerequisite/service-prerequisite.component';
import {ServiceStepPipePipe} from '../../app/pipe/service-step-pipe.pipe';
import {ProjectListComponent} from '../../app/components/project-profile/project-list/project-list.component';
import {AccessDeniedComponent} from '../../app/components/denied/denied.component';
import {NotFoundComponent} from '../../app/components/not-found/not-found.component';
import {CustomerServiceStarterComponent} from '../../app/components/my-dashboard/customerService/customerServices.component';
import {ServicePipePipe} from '../../app/pipe/service-pipe.pipe';
import {LookuptypePipe} from '../../app/pipe/lookuptype.pipe.pipe';
import {LookupPipe} from '../../app/pipe/lookup-pipe.pipe';
import {ShowErrorsComponent} from '../../app/components/show-errors/show-errors.component';
import {CustomsbranchPipe} from '../../app/pipe/customsbranch-pipe';
import {LetterLookupPipe} from '../../app/pipe/letter-lookup.pipe';
import {LookupReasonPipe} from '../../app/pipe/lookup-reason-pipe.pipe';

@NgModule({
  imports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    AngMaterialModule,
    TranslateModule,

    // FooterModule,
    // ThemePickerModule

  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    AngMaterialModule,
    TranslateModule,
    PageHeaderComponent,
    GroupByPipe,
    UserEditorComponent,
    AppDialogComponent,
    RegionPipePipe,
    WoredaPipePipe,
    ZonePipePipe,
    CountryPipe,
    FilterPipePipe,
    EnabledControlDirective,
    ServicePrerequisiteComponent,
    ServiceStepPipePipe,
    ServicePipePipe,
    ProjectListComponent,

    NotFoundComponent,
    AccessDeniedComponent,
    CustomerServiceStarterComponent,
    LookupPipe,
    LookuptypePipe,
    ShowErrorsComponent,
    CustomsbranchPipe,
    LookupReasonPipe,
    LetterLookupPipe

  ],
  declarations: [
    PageHeaderComponent,
    AngConfirmDialogComponent,
    GroupByPipe,
    UserEditorComponent,
    AppDialogComponent,
    RegionPipePipe,
    WoredaPipePipe,
    ZonePipePipe,
    CountryPipe,
    FilterPipePipe,
    EnabledControlDirective,
    ServicePrerequisiteComponent,
    ServiceStepPipePipe,
    ServicePipePipe,
    ProjectListComponent,

    NotFoundComponent,
    AccessDeniedComponent,
    CustomerServiceStarterComponent,
    LookupPipe,
    LookuptypePipe,
    ShowErrorsComponent,
    CustomsbranchPipe,
    LookupReasonPipe,
    LetterLookupPipe

  ],
  entryComponents: [
    AngConfirmDialogComponent,
    AppDialogComponent
  ],
  // providers: [DatePipe],
})
export class SharedModule {
}
