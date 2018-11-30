import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {AssociateRoutingModule} from './associate-routing.module';
import {AssociateFormComponent} from './associate-form/associate-form.component';
import {AssociateComponent} from './associate.component';
import {FALLBACK, GravatarConfig, GravatarModule, RATING} from 'ngx-gravatar';

const gravatarConfig: GravatarConfig = {
  fallback: FALLBACK.robohash,
  rating: RATING.x,
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  borderColor: 'rgba(0, 0, 0, 0.1)',
  hasBorder: true // Set this flag to true to have a border by default
};

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AssociateRoutingModule,
    GravatarModule.forRoot(gravatarConfig)
  ],
  declarations: [AssociateComponent,
    AssociateFormComponent],
  exports: [AssociateComponent,
    AssociateFormComponent]
})
export class AssociateModule {

}
