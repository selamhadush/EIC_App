import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchBrowserComponent} from './search-browser.component';

const routes: Routes = [
  {path: '', component: SearchBrowserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchBrowserRoutingModule {

}
