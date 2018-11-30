import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
 import { RequestedItemsListComponent } from './requested-items-list.component';

const routes: Routes = [
  {path: '', component: RequestedItemsListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestedItemsListRoutingModule { }
