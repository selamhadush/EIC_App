import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CapitalRegistrationComponent} from './capital-registration.component';

const routes: Routes = [
  {path: '', component: CapitalRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapitalRegistrationRoutingModule {

}
