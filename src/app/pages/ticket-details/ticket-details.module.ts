import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomPipesModule } from 'src/app/core/pipes/custom-pipes.module';
import { SharedModule } from '../../components/shared-module.module';
import { TicketDetailsPageRoutingModule } from './ticket-details-routing.module';
import { TicketDetailsPage } from './ticket-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketDetailsPageRoutingModule,
    SharedModule,
    CustomPipesModule,
  ],
  declarations: [TicketDetailsPage],
})
export class TicketDetailsPageModule {}
