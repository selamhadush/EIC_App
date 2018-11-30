import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LettertemplateComponent} from "./lettertemplate.component";

const routes: Routes = [
  {path: '', component: LettertemplateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LettertempalteRoutingModule { }
