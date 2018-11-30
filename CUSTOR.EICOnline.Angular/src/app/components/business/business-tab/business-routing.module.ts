import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {BusinessTabComponent} from "./business-tab.component";

const route: Routes = [{
  path: '', component: BusinessTabComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class BusinessRoutingModule {
}
