import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {ResetRoutingModule} from './reset-routing.module';
import {ResetComponent} from './reset.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ResetRoutingModule
  ],
  declarations: [ResetComponent]
})
export class ResetModule {
}