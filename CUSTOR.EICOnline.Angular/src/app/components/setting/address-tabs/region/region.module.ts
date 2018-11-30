import { NgModule } from '@angular/core';

import { RegionRoutingModule } from './region-routing.module';
import { ListRegionComponent } from './list/list-region.component';
import { EditRegionComponent } from './edit/edit-region.component';
import { RegionComponent } from './region.component';
import { SharedModule } from '@custor/modules/shared.module';

@NgModule({
  imports: [

    RegionRoutingModule,
    SharedModule
  ],
  declarations: [ListRegionComponent, EditRegionComponent, RegionComponent],
  exports: [ListRegionComponent, EditRegionComponent, RegionComponent]
})
export class RegionModule {
}