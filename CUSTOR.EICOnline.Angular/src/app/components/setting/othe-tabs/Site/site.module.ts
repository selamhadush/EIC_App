import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SiteRoutingModule} from './site-routing.module';
import {ListSiteComponent} from './list/list-site.component';
import {EditSiteComponent} from './edit/edit-site.component';
import {SharedModule} from '@custor/modules/shared.module';
import {SiteComponent} from './site.component';

@NgModule({
  imports: [
    CommonModule,
    SiteRoutingModule,
    SharedModule
  ],
  declarations: [ListSiteComponent, EditSiteComponent, SiteComponent],
  exports: [ListSiteComponent, EditSiteComponent, SiteComponent],
})
export class SiteModule {
}