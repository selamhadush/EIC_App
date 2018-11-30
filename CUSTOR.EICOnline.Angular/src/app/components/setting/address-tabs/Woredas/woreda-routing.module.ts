import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WoredaComponent} from './woreda.component';
import {EditWoredaComponent} from './edit/edit-woreda.component';
import {ListWoredaComponent} from './list/list-woreda.component';

const routes: Routes = [{
  path: '',  component: WoredaComponent,  children: [
    {path: '', component: ListWoredaComponent},
    {path: 'list', component: ListWoredaComponent},
    {path: 'edit/:id', component: EditWoredaComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WoredaRoutingModule {
}