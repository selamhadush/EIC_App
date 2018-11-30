import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSubsectorComponent } from './list/list-subsector.component';
import { EditSubsectorComponent } from './edit/edit-subsector.component';
import { SubsectorRoutingModule } from './subsector-routing.module';
import { SubsectorComponent } from './subsector.component';
import { SharedModule } from '@custor/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SubsectorRoutingModule,
    SharedModule
  ],
  declarations: [ListSubsectorComponent, EditSubsectorComponent, SubsectorComponent],
  exports: [ListSubsectorComponent, EditSubsectorComponent, SubsectorComponent],
})
export class SubsectorModule {
}