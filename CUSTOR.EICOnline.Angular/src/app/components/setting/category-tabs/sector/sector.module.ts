import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorRoutingModule } from './sector-routing.module';
import { ListSectorComponent } from './list/list-sector.component';
import { EditSectorComponent } from './edit/edit-sector.component';
import { SectorComponent } from './sector.component';
import { SharedModule } from '../../../../../@custor/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SectorRoutingModule,
    SharedModule],
  declarations: [ListSectorComponent, EditSectorComponent, SectorComponent],
  exports: [ListSectorComponent, EditSectorComponent, SectorComponent],
  //  providers: [DatePipe],
  //bootstrap: [SectorComponent]
})
export class SectorModule {
}