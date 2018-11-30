import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SparePartRoutingModule } from './spare-part-routing.module';
import {SharedModule} from '@custor/modules/shared.module';
import {SparePartComponent} from './spare-part.component';

@NgModule({
  imports: [
    CommonModule,
    SparePartRoutingModule,
    SharedModule,
  ],
  declarations: [
    SparePartComponent
  ],
  exports: [
    SparePartComponent
  ]
})
export class SparePartModule { }
