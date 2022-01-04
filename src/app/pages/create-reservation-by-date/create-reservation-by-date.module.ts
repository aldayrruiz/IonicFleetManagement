import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgCalendarModule } from 'ionic2-calendar';
import { SharedModule } from 'src/app/shared/shared-module.module';
import { CalModalPageModule } from '../cal-modal/cal-modal.module';
import { CreateReservationByDatePageRoutingModule } from './create-reservation-by-date-routing.module';
import { CreateReservationByDatePage } from './create-reservation-by-date.page';

registerLocaleData(localeEs);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CreateReservationByDatePageRoutingModule,
    NgCalendarModule,
    CalModalPageModule,
    ReactiveFormsModule,
  ],
  declarations: [CreateReservationByDatePage],
  providers: [{ provide: LOCALE_ID, useValue: 'es-ES' }],
})
export class CreateReservationByDatePageModule {}
