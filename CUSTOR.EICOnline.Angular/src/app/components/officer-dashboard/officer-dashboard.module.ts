import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {OfficerDashboardRoutingModule} from './officer-dashboard-routing.module';
import {OfficerDashboardComponent} from './officer-dashboard.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OfficerDashboardRoutingModule,
    NgxChartsModule
  ],
  declarations: [OfficerDashboardComponent]
})
export class OfficerDashboardModule {
}
