import {NgModule} from '@angular/core';
import {SharedModule} from '../../../../../@custor/modules/shared.module';
import {EditComponent} from './edit/edit.component';
import {ListComponent} from './list/list.component';
import {ServiceRoutingModule} from './services-routing.module';
import {ServicesComponent} from './services.component';

@NgModule({
  imports: [
    ServiceRoutingModule,
    SharedModule
  ],
  declarations: [EditComponent, ListComponent, ServicesComponent],
  exports: [EditComponent, ListComponent, ServicesComponent],
})
export class ServicesModule {
}