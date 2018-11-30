import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {KebeleRoutingModule} from './kebele-routing.module';
import {ListKebeleComponent} from './list/list-kebele.component';
import {EditKebeleComponent} from './edit/edit-kebele.component';
import {KebeleComponent} from './kebele.component';
import {SharedModule} from '../../../../../@custor/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    KebeleRoutingModule,
    SharedModule],
  declarations: [ListKebeleComponent, EditKebeleComponent, KebeleComponent],
  exports: [ListKebeleComponent, EditKebeleComponent, KebeleComponent]
})
export class KebeleModule {
}