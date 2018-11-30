import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListInvactivityComponent} from './list/list-invactivity.component';
import {EditInvactivityComponent} from './edit/edit-invactivity.component';
import {InvactivityRoutingModule} from './invactivity-routing.module';
import {InvactivityComponent} from './invactivity.component';
import {SharedModule} from '../../../../../@custor/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    InvactivityRoutingModule,
    SharedModule
  ],
  declarations: [ListInvactivityComponent, EditInvactivityComponent, InvactivityComponent],
  exports: [ListInvactivityComponent, EditInvactivityComponent, InvactivityComponent],
})
export class InvactivityModule {
}