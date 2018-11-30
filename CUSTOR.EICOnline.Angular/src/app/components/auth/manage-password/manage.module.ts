import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {ManagePasswordRoutingModule} from './manage-routing.module';
import {ManagePasswordComponent} from './manage.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ManagePasswordRoutingModule
  ],
  declarations: [ManagePasswordComponent]
})
export class ManagePasswordModule {
}