import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AssociateComponent} from './associate.component';
import {AssociateFormComponent} from './associate-form/associate-form.component';

const routes: Routes = [
  // {path: '', component: AssociateComponent},
  {path: 'list', component: AssociateComponent},
  {path: 'form/:id', component: AssociateFormComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class AssociateRoutingModule {

}
