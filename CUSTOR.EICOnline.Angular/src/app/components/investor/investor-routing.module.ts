import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditInvestorComponent} from './investor-editor.component';
import {InvestorComponent} from './investor/investor.component';
import {InvestorListComponent} from './investor-list.component';

const route: Routes = [
  {
    path: '', component: InvestorComponent, children: [
      {path: '', component: InvestorListComponent},
      {path: 'list', component: InvestorListComponent},
      {path: 'edit/:id', component: EditInvestorComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class InvestorRoutingModule {
}