import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {BillOfMaterialRoutingModule} from './BillOfMaterialRouting.module';
import {BillOfMaterialComponent} from './bill-of-material.component';
import {BillOfMaterialTabComponent} from './bill-of-material-tab/bill-of-material-tab.component';
import {ServiceConfirmationModule} from '../../project-profile/service-confirmation/ServiceConfirmation.module';
import {LetterModule} from '../../project-profile/letter/letter.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BillOfMaterialRoutingModule,
    ServiceConfirmationModule,
    LetterModule
  ],
  declarations: [
    BillOfMaterialComponent,
    BillOfMaterialTabComponent
  ],
  exports: [
    BillOfMaterialComponent,
    BillOfMaterialTabComponent]
})
export class BillOfMaterialModule {

}
