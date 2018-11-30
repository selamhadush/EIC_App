import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SiteComponent} from './site.component';
import {ListSiteComponent} from './list/list-site.component';
import {EditSiteComponent} from './edit/edit-site.component';

const routes: Routes = [{
  path: '', component: SiteComponent, children: [
    {path: '', component: ListSiteComponent},
    {path: 'list', component: ListSiteComponent},
    {path: 'edit/:id', component: EditSiteComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule {
}