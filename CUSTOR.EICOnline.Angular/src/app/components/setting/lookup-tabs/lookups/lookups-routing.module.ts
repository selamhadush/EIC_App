import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LookupsComponent} from "./lookups.component";
import {ListLookupsComponent} from "./list/list-lookups.component";
import {EditLookupsComponent} from "./edit/edit-lookups.component";

const LookupsRoute: Routes = [

    { path: 'list', component: ListLookupsComponent },
    { path: 'edit/:id', component: EditLookupsComponent }
  ];


@NgModule({
  imports: [RouterModule.forChild(LookupsRoute)],
  exports: [RouterModule]
})
export class LookupsRoutingModule { }
