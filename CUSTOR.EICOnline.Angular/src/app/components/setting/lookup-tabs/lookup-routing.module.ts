import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {LookupTabsComponent} from "./lookup-tabs.component";
import {SharedModule} from "@custor/modules/shared.module";

const route: Routes = [
  { path: '', component: LookupTabsComponent }
];
@NgModule({
  imports: [
   RouterModule.forChild(route)
  ],
  declarations: [],
  exports:[RouterModule]
})
export class LookupRoutingModule { }
