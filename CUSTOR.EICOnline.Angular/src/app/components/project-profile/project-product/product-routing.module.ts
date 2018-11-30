import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectProductListComponent} from './project-product-list/project-product-list.component';
import {ProjectProductComponent} from './project-product.component';

const proRoutes: Routes = [
  {path: '', component: ProjectProductListComponent},
  {path: ':id', component: ProjectProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(proRoutes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {

}
