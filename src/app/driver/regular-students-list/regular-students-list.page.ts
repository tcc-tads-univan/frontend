import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {DriverService} from "../../services/driver.service";
import {Observable} from "rxjs";
import {DriverSubscriptions} from "../../shared/models/subscriptions/driver-subscriptions";
import {RegularStudent} from "../../shared/models/regular-student/regular-student";
import {RouterLink} from "@angular/router";
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {
  EmptyRegularStudentsComponent
} from "../../components/driver/empty-regular-students/empty-regular-students.component";
import {ToastService} from "../../services/toast.service";
import {MaskitoOptions} from "@maskito/core";
import {MaskitoModule} from "@maskito/angular";
import {DateFormatPipe} from "../../shared/pipes/date-format.pipe";
import {CurrencyFormatPipe} from "../../shared/pipes/currency-format.pipe";
import {RefreshService} from "../../services/refresh.service";

@Component({
  selector: 'app-register-edit-regular-student',
  templateUrl: './regular-students-list.page.html',
  styleUrls: ['./regular-students-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, EmptyRegularStudentsComponent, MaskitoModule, DateFormatPipe, CurrencyFormatPipe],
  providers: [DriverService, AuthenticationService, RefreshService]
})
export class RegularStudentsListPage implements OnInit {
  driverId!: number;
  username: string | undefined;
  isModalOpen: boolean = false;
  currentDate: Date = new Date();
  subscriptions$!: Observable<DriverSubscriptions>;
  regularStudent$!: Observable<RegularStudent>;

  readonly phoneMask: MaskitoOptions = {
    mask: ['+', '55', ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  };
  readonly brlMask: MaskitoOptions = {
    mask: ['R', '$', ' ', /\d/, '.', /\d/, /\d/, /\d/, ',',  '0', '0'],  };
  constructor(private driverService: DriverService,
              private authService: AuthenticationService,
              private toastService: ToastService,
              private refreshService: RefreshService) {
  }

  ngOnInit() {
    this.driverId = this.authService.loggedUser!.userId;
    this.username = this.authService.loggedUser!.name;
  }

  ionViewWillEnter() {
    this.subscriptions$! = this.driverService.findDriverSubscriptions(this.driverId);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  handleModal(subscriptionId: number) {
    this.regularStudent$! = this.driverService.findDriverSubscriptionsById(this.driverId, subscriptionId);
    this.setOpen(true);
  }

  createNewPayment(driverId: number, subscriptionId: number) {
    this.driverService.createNewPayment(driverId, subscriptionId).subscribe({
        next: _ => {
          this.toastService.showSuccessToast('Cobrança efetuada!');
        },
        error: err => {
          this.toastService.showErrorToastAndLog('Você tem que esperar um mês para executar nova cobrança.', err);
        }
      }
    )
  }

  updatePaymentStatus(driverId: number, subscriptionId: number, paymentId: number) {
    this.driverService.updatePaymentStatus(driverId, subscriptionId, paymentId).subscribe({
        next: _ => {
          this.toastService.showSuccessToast('Status atualizado.');
        },
        error: err => {
          this.toastService.showErrorToastAndLog('Houve algum erro.', err);
        }
      }
    )
  }

  onRefresh() {
    this.refreshService.handleRefresh();
  }
}
