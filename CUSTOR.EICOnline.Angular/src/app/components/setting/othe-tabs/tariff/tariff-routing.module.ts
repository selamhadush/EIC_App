import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditTariffComponent} from './edit/edit-tariff.component';
import {ListTariffComponent} from './list/list-tariff.component';
import {TariffComponent} from './tariff.component';

const routes: Routes = [{
  path: '', component: TariffComponent, children: [
    {path: '', component: ListTariffComponent},
    {path: 'list', component: ListTariffComponent},
    {path: 'edit/:id', component: EditTariffComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TariffRoutingModule {
}