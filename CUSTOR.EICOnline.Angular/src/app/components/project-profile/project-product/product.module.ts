import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {ProductRoutingModule} from './product-routing.module';
import {ProjectProductListComponent} from './project-product-list/project-product-list.component';
import {ProjectProductComponent} from './project-product.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ],
  declarations: [ProjectProductListComponent, ProjectProductComponent],
  exports: [ProjectProductListComponent, ProjectProductComponent]
})
export class ProductModule {

}
