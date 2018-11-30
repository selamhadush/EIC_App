import {NgModule} from '@angular/core';
import {SharedModule} from '@custor/modules/shared.module';
import {DraftedApplicationRoutingModule} from '../drafted-application/drafted-application-routing.module';
import {CommonModule} from '@angular/common';
import {DraftedApplicationComponent} from '../drafted-application/drafted-application.component';
import {ArchiveApplicationRoutingModule} from './archive-application-routing.module';
import {ArchiveApplicationComponent} from './archive-application.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ArchiveApplicationRoutingModule
  ],
  declarations: [ArchiveApplicationComponent]
})
export class ArchiveApplicationModule {

}
