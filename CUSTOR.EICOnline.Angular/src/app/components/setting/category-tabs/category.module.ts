import {NgModule} from '@angular/core';
import {CategoryTabsComponent} from './category-tabs.component';
import {CategoryRoutingModule} from './category-routing.module';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {SectorModule} from './sector/sector.module';
import {SubsectorModule} from './subsector/subsector.module';
import {ActivityModule} from './Activity/activity.module';
import {InvactivityModule} from './InvActivity/invactivity.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CategoryRoutingModule,
    SectorModule,
    SubsectorModule,
    ActivityModule,
    InvactivityModule
  ],
  declarations: [CategoryTabsComponent]
})
export class CategoryModule {
}