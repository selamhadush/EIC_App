import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZoneComponent } from './zone.component';
import { ListZoneComponent } from './list/list-zone.component';
import { EditZoneComponent } from './edit/edit-zone.component';

const routes: Routes = [{
  path: '', component: ZoneComponent, children: [
    { path: '', component: ListZoneComponent },
    { path: 'list', component: ListZoneComponent },
    { path: 'edit/:id', component: EditZoneComponent }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZoneRoutingModule {
}