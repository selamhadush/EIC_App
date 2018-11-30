import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './list/customer-list.component';
import { EditCustomerComponent } from './edit/edit-customer.component';
import { CustomersComponent } from './customers.component';

const customersRoutes: Routes = [
  {
    path: 'customers',
    component: CustomersComponent,
    children: [
      { path: 'edit/:id', component: EditCustomerComponent },
      { path: 'list', component: CustomerListComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(customersRoutes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }