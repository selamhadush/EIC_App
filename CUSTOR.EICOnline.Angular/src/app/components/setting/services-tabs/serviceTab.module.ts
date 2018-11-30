import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {ServicesTabsComponent} from './services-tabs.component';
import {ServiceTabRoutingModule} from './serviceTab-routing.module';
import {ServicesModule} from './services/services.module';
import {ServicePrerequisiteModule} from '../../project-profile/service-prerequisite/ServicePrerequisiteModule';
import {ServicestepperModule} from './servicestepper/servicestepper.module';
import {ServicetariffModule} from './servicetariff/servicetariff.module';
import {ServiceapplicationModule} from './serviceApplication/serviceapplication.module';
import {ServicePrerequsiteModule} from './serviceprerequistie/serviceprerequiste.module';
import {TariffModule} from "../othe-tabs/tariff/tariff.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ServiceTabRoutingModule,
    ServicesModule,
    ServicePrerequsiteModule,
    ServicestepperModule,
    ServicetariffModule,
    ServiceapplicationModule,
    TariffModule
  ],
  declarations: [ServicesTabsComponent],
  exports: [ServicesTabsComponent]
})
export class ServiceTabModule {
}
