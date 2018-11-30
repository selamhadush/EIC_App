import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IncentiveServicesComponent} from './incentive-services.component';

const routes: Routes = [
  // {path: '', component: IncentiveServicesComponent},
  // {path: '', redirectTo: '/incentive-services', pathMatch: 'full'},
  {
    path: '', component: IncentiveServicesComponent, children: [
      // {path: '', component: AftercareComponent},
      {
        path: 'incentive-tab',
        loadChildren: 'app/components/incentive/incentive-tab/incentive-tab.module#IncentiveTabModule',
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncentiveServiceRoutingModule {

}
