import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ListLookuptypesComponent} from "./list/list-lookuptypes.component";
import {EditLookuptypesComponent} from "./edit/edit-lookuptypes.component";
import {LookuptypesComponent} from "./lookuptypes.component";

const lookupstypeRoutes: Routes = [
  {
  path: '', component: LookuptypesComponent, children: [
    { path: 'list', component: ListLookuptypesComponent },
    { path: 'edit/:id', component: EditLookuptypesComponent }
    ]
  }
  ];

@NgModule({
    imports: [RouterModule.forChild(lookupstypeRoutes)],
     exports: [RouterModule]
})
export class LookuptypesRoutingModule { }
