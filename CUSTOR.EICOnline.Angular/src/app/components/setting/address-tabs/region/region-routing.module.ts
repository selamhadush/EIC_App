import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionComponent } from './region.component';
import { EditRegionComponent } from './edit/edit-region.component';
import { ListRegionComponent } from './list/list-region.component';

const routes: Routes = [
  {
    path: '', component: RegionComponent, children: [
      { path: '', component: ListRegionComponent },
      { path: 'list', component: ListRegionComponent },
      { path: 'edit/:id', component: EditRegionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionRoutingModule {
}