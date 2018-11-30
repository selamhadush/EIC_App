import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddressTabsComponent} from './address-tabs.component';

const route: Routes = [
  {path: '', component: AddressTabsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class AddressRoutingModule {
}