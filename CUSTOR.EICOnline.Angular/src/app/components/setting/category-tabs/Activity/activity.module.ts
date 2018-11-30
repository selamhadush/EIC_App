import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ActivityRoutingModule} from './activity-routing.module';
import {ListActivityComponent} from './list/list-activity.component';
import {EditActivityComponent} from './edit/edit-activity.component';
import {ActivityComponent} from './activity.component';
import {SharedModule} from '@custor/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ActivityRoutingModule,
    SharedModule
  ],
  declarations: [ListActivityComponent, EditActivityComponent, ActivityComponent],
  exports: [ListActivityComponent, EditActivityComponent, ActivityComponent],
})
export class ActivityModule {
}