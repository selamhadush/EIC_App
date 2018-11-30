import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AftercareComponent} from './aftercare.component';
import {ProjectStatusComponent} from './project-status/project-status.component';

const route: Routes = [
  {path: '', redirectTo: '/after-care', pathMatch: 'full'},
  {
    path: '', component: AftercareComponent, children: [
      // {path: '', component: AftercareComponent},
      {
        path: 'cost-list',
        loadChildren: 'app/components/project-profile/project-cost/ProjectCost.module#ProjectCostModule'
      },
      {
        path: 'employment',
        loadChildren: 'app/components/project-profile/project-employment/employment.module#EmploymentModule'
      },
      {
        path: 'share',
        loadChildren: 'app/components/project-profile/project-share/Share.module#ShareModule'
      },
      {
        path: 'product',
        loadChildren: 'app/components/project-profile/project-product/product.module#ProductModule'
      },
      {
        path: 'utility',
        loadChildren: 'app/components/project-profile/project-input/utility.module#UtilityModule'
      },
      {
        path: 'raw-material',
        loadChildren: 'app/components/project-profile/project-input/raw-material-list/rawMaterial.Module#RawMaterialModule'
      },
      {
        path: 'project-status', component: ProjectStatusComponent
      },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class AftercareRoutingModule {
}
