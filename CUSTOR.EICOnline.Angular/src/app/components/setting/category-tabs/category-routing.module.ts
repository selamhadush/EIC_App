import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryTabsComponent } from './category-tabs.component';

const route: Routes = [
  { path: '', component: CategoryTabsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class CategoryRoutingModule {
}