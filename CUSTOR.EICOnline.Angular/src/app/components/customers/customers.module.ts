import { NgModule } from '@angular/core';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { HttpClientModule } from '@angular/common/http';
// import { AppConfiguration } from './config/appconfig';
// import {ErrorMessage} from './common/services/errMessageService';
// import 'hammerjs';
import { CustomerListComponent } from './list/customer-list.component';
import { EditCustomerComponent } from './edit/edit-customer.component';
// import { CustomerService } from './customerService';
import { DatePipe } from '@angular/common';
import { SharedModule } from '../../../@custor/modules/shared.module';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerListComponent,
    EditCustomerComponent

  ],
  imports: [
    HttpClientModule,
    CustomersRoutingModule,
    SharedModule],
  providers: [DatePipe],
  bootstrap: [CustomersComponent]
})
export class CustomersModule {
}