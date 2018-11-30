import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxExemptionTabRoutingModule } from './tax-exemption-tab-routing.module';
import {SharedModule} from '@custor/modules/shared.module';
import {LetterModule} from '../../../project-profile/letter/letter.module';
import {TaxExemptionTabComponent} from './tax-exemption-tab.component';
import {TaxExemptionModule} from '../tax-exemption.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TaxExemptionTabRoutingModule,
    LetterModule,
    TaxExemptionModule

  ],
  declarations: []
})
export class TaxExemptionTabModule { }
