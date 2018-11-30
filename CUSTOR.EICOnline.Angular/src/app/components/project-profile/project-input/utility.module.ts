import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {UtilityRoutingModule} from './utility-routing.module';
import {ProjectUtilityListComponent} from './project-utility-list/project-utility-list.component';
import {RawMaterialFormComponent} from './raw-material-form/raw-material-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UtilityRoutingModule
  ],
  declarations: [ProjectUtilityListComponent, RawMaterialFormComponent],
  exports: [ProjectUtilityListComponent, RawMaterialFormComponent]
})
export class UtilityModule {

}
