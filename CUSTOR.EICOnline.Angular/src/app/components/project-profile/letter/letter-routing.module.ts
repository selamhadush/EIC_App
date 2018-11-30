import {RouterModule, Routes} from '@angular/router';
import {LetterComponent} from './letter.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {path: '', component: LetterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LetterRoutingModule {

}
