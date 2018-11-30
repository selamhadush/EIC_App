import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@custor/modules/shared.module';
import { RequirementComponent } from './requirement.component';
import { RequirementRoutingModule } from './requirement-routing.module';

@NgModule({
  imports: [CommonModule,
    SharedModule,
    RequirementRoutingModule],
  exports: [RequirementComponent],
  declarations: [RequirementComponent]
})
export class RequirementModule {
}