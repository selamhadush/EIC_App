import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {InvestorListComponent} from './investor-list.component';
import {EditInvestorComponent} from './investor-editor.component';
import {InvestorRoutingModule} from './investor-routing.module';
import {InvestorComponent} from './investor/investor.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InvestorRoutingModule
  ],
  declarations: [
    InvestorListComponent,
    EditInvestorComponent,
    InvestorComponent],
  exports: [
    InvestorListComponent,
    EditInvestorComponent,
    InvestorComponent]
})
export class InvestorModule {
}
