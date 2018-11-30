import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListLookuptypesComponent} from "./list/list-lookuptypes.component";
import {EditLookuptypesComponent} from "./edit/edit-lookuptypes.component";
import {SharedModule} from "@custor/modules/shared.module";
import {LookuptypesRoutingModule} from "./lookuptypes-routing.module";
import {LookuptypesComponent} from "./lookuptypes.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LookuptypesRoutingModule
  ],
  declarations: [ListLookuptypesComponent,EditLookuptypesComponent,LookuptypesComponent],
  exports: [ListLookuptypesComponent,EditLookuptypesComponent,LookuptypesComponent]
})
export class LookupTypesModule { }
