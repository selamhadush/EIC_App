import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ZoneRoutingModule} from './zone-routing.module';
import {ListZoneComponent} from './list/list-zone.component';
import {EditZoneComponent} from './edit/edit-zone.component';
import {ZoneComponent} from './zone.component';
import {SharedModule} from '../../../../../@custor/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ZoneRoutingModule,
    SharedModule
  ],
  declarations: [ListZoneComponent, EditZoneComponent, ZoneComponent],
  exports: [ListZoneComponent, EditZoneComponent, ZoneComponent]
})
export class ZoneModule {
}