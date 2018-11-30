import { NgModule } from '@angular/core';
import { SiteModule } from './Site/site.module';
import { OtheTabsComponent } from './othe-tabs.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@custor/modules/shared.module';
import { OtherRouting } from './other-routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OtherRouting,
    SiteModule,    ],
  declarations: [OtheTabsComponent],
  exports: [OtheTabsComponent]
})
export class OtherModule {
}
