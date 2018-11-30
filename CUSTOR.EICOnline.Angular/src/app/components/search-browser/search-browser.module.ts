import {NgModule} from '@angular/core';
import {SharedModule} from '@custor/modules/shared.module';
import {CommonModule} from '@angular/common';
import {SearchBrowserRoutingModule} from './search-browser-routing.module';
import {SearchBrowserComponent} from './search-browser.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SearchBrowserRoutingModule
  ],
  declarations: [SearchBrowserComponent]
})
export class SearchBrowserModule {

}
