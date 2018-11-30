import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SparePartComponent} from './spare-part.component';

const routes: Routes = [
  {path: '', component: SparePartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SparePartRoutingModule {
}
