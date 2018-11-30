import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityComponent} from './activity.component';
import {EditActivityComponent} from './edit/edit-activity.component';
import {ListActivityComponent} from './list/list-activity.component';

const routes: Routes = [
  {
    path: '', component: ActivityComponent,    children: [
      {path: '', component: ListActivityComponent},
      {path: 'list', component: ListActivityComponent},
      {path: 'edit/:id', component: EditActivityComponent}
      ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule {
}