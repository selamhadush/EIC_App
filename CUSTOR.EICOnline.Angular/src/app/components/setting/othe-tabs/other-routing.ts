import { RouterModule, Routes } from '@angular/router';
import { OtheTabsComponent } from './othe-tabs.component';
import { NgModule } from '@angular/core';

const route: Routes = [
  { path: '', component: OtheTabsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class OtherRouting {
}