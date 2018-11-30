import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {AddressTabsComponent} from './address-tabs.component';
import {AddressRoutingModule} from './address-routing.module';
import {RegionModule} from './region/region.module';
import {ZoneModule} from './zone/zone.module';
import {WoredaModule} from './Woredas/woreda.module';
import {KebeleModule} from './kebele/kebele.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AddressRoutingModule,
    RegionModule,
    ZoneModule,
    WoredaModule,
    KebeleModule
  ],
  declarations: [
    AddressTabsComponent,
    // ListRegionComponent
  ]
})
export class AddressModule {
}