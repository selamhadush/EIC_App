import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServicesTabsComponent} from './services-tabs.component';

const route: Routes = [
  {path: '', component: ServicesTabsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class ServiceTabRoutingModule {
}