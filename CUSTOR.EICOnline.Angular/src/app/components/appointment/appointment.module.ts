import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {AppointmentRouting} from './appointment-routing';
import {AppointmentComponent} from './appointment.component';

@NgModule({
  imports: [CommonModule,
    SharedModule,
    AppointmentRouting
  ],
  declarations: [AppointmentComponent],
  exports: [AppointmentComponent]

})
export class AppointmentModule {

}
