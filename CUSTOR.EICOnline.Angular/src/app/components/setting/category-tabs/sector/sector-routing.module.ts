import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSectorComponent } from './list/list-sector.component';
import { EditSectorComponent } from './edit/edit-sector.component';
import { SectorComponent } from './sector.component';

const SectorRoutes: Routes = [
  {
    path: '', component: SectorComponent, children: [
      { path: '', component: ListSectorComponent },
      { path: 'list', component: ListSectorComponent },
      { path: 'edit/:id', component: EditSectorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(SectorRoutes)],
  exports: [RouterModule]
})
export class SectorRoutingModule {
}