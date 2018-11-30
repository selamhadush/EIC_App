import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BillOfMaterialComponent} from './bill-of-material.component';
import {BillOfMaterialTabComponent} from './bill-of-material-tab/bill-of-material-tab.component';

const routes: Routes = [
  {path: '', component: BillOfMaterialTabComponent},
  {path: 'bill-of-material-tab', component: BillOfMaterialTabComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillOfMaterialRoutingModule {

}
