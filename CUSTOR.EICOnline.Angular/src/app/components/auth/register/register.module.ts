import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {RegisterRoutingModule} from './register-routing.module';
import {RegisterComponent} from './register.component';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RegisterRoutingModule,
    RecaptchaFormsModule,
    RecaptchaModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule {
}