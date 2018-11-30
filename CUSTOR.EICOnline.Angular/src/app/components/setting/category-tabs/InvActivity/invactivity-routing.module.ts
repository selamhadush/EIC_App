import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListInvactivityComponent } from './list/list-invactivity.component';
import { EditInvactivityComponent } from './edit/edit-invactivity.component';
import { InvactivityComponent } from './invactivity.component';

const routes: Routes = [
  {
    path: '', component: InvactivityComponent,
    children: [
      { path: '', component: ListInvactivityComponent },
      { path: 'list', component: ListInvactivityComponent },
      { path: 'edit/:id', component: EditInvactivityComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvactivityRoutingModule {
}