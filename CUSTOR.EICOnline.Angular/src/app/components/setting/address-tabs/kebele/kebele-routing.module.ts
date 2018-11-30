import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {KebeleComponent} from './kebele.component';
import {ListKebeleComponent} from './list/list-kebele.component';
import {EditKebeleComponent} from './edit/edit-kebele.component';

const routes: Routes = [
  {
    path: '', component: KebeleComponent,
    children: [
      {path: '', component: ListKebeleComponent},
      {path: 'list', component: ListKebeleComponent},
      {path: 'edit/:id', component: EditKebeleComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KebeleRoutingModule {
}