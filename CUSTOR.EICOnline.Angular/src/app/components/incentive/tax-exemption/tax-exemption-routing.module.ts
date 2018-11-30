import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TaxExemptionTabComponent} from './tax-exemption-tab/tax-exemption-tab.component';

const routes: Routes = [
  {path: '', component: TaxExemptionTabComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxExemptionRoutingModule {
}
