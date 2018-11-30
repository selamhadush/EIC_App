import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListLookupsComponent} from "./list/list-lookups.component";
import {EditLookupsComponent} from "./edit/edit-lookups.component";
import {LookupsComponent} from "./lookups.component";
import {SharedModule} from "@custor/modules/shared.module";
import {LookupsRoutingModule} from "./lookups-routing.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LookupsRoutingModule
  ],
  declarations: [ListLookupsComponent,EditLookupsComponent,LookupsComponent],
  exports: [ListLookupsComponent,EditLookupsComponent,LookupsComponent]
})
export class LookupsModule { }
