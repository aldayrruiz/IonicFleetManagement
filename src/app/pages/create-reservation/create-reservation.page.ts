import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { CreateReservation, VehicleDetails } from 'src/app/core/models';
import {
  CalModalService,
  ErrorMessageService,
  LoadingService,
  ReservationService,
  SnackerService,
  VehiclesTabStorage,
} from 'src/app/core/services';
import {
  combineAndSerialize,
  initDates,
  validate,
} from 'src/app/shared/utils/dates/dates';
import { Ghost } from 'src/app/shared/utils/routing';
import {
  descriptionValidators,
  titleValidators,
} from 'src/app/shared/utils/validators';
import { CalModalPage } from '../cal-modal/cal-modal.page';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.page.html',
  styleUrls: ['./create-reservation.page.scss', '../../../styles.css'],
})
export class CreateReservationPage implements OnInit {
  form: FormGroup;
  vehicle: VehicleDetails;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;

  constructor(
    private reservationService: ReservationService,
    private errorMessage: ErrorMessageService,
    private calModalService: CalModalService,
    private tabStorage: VehiclesTabStorage,
    private loadingSrv: LoadingService,
    private modalCtrl: ModalController,
    private snacker: SnackerService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initFormGroup();
    this.initDates();
    this.initVehicleFromTabStorage();
  }

  async createReservation() {
    const newReservation = this.getReservation();
    await this.loadingSrv.present();

    // * Validation
    const start = new Date(newReservation.start);
    const end = new Date(newReservation.end);
    const [msg, isValid] = validate(start, end);

    if (!isValid) {
      this.snacker.showFailed(msg);
      return;
    }

    // * Send to server
    this.reservationService
      .create(newReservation)
      .pipe(finalize(async () => await this.loadingSrv.dismiss()))
      .subscribe(
        // newReservation is the response from server - executes if response was ok
        async (reservation) => {
          await Ghost.goToReservationDetails(this.router, reservation.id);
          await this.showSuccessfulMsg();
        },
        // error is the message from the server - executes if response was not ok
        async (error) => await this.showFailedMsg(error)
      );
  }

  async openCalModal(type: string): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false,
    });

    if (type === 'start') {
      console.log(this.startDate);
      this.calModalService.setDate(this.startDate);
    } else {
      console.log(this.endDate);
      this.calModalService.setDate(this.endDate);
    }

    await modal.present();

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        console.log(result.data.event);
        const date = result.data.event.date;

        if (type === 'start') {
          this.startDate = date;
        } else {
          this.endDate = date;
        }
      }
    });
  }

  get title(): AbstractControl {
    return this.form.get('title');
  }

  get description(): AbstractControl {
    return this.form.get('description');
  }

  private getReservation(): CreateReservation {
    return {
      title: this.form.value.title,
      start: combineAndSerialize(this.startDate, this.startTime),
      end: combineAndSerialize(this.endDate, this.endTime),
      description: this.form.value.description,
      vehicle: this.vehicle.id,
    };
  }

  private initFormGroup() {
    this.form = this.fb.group({
      title: titleValidators,
      description: descriptionValidators,
    });
  }

  private initDates() {
    // Init dates fields from date selected in vehicles details page.
    const from = this.tabStorage.getSelectedDate();
    const { startDate, startTime, endDate, endTime } = initDates(from);
    this.startDate = startDate;
    this.startTime = startTime;
    this.endDate = endDate;
    this.endTime = endTime;
  }

  private initVehicleFromTabStorage() {
    this.vehicle = this.tabStorage.getCurrentVehicle();
  }

  private async showSuccessfulMsg() {
    const msg = 'Reserva creada con exito';
    await this.snacker.showSuccessful(msg);
  }

  private async showFailedMsg(error) {
    const msg = this.errorMessage.get(error);
    await this.snacker.showFailed(msg);
  }
}
