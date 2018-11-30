import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {DraftedApplicationRoutingModule} from './drafted-application-routing.module';
import {DraftedApplicationComponent} from './drafted-application.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DraftedApplicationRoutingModule
  ],
  declarations: [DraftedApplicationComponent]
})
export class DraftedApplicationModule {

}
