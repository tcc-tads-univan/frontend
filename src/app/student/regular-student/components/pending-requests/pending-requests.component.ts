import {Component, Input, OnInit} from '@angular/core';
import {PendingSubscriptions} from "../../../../shared/models/subscriptions/pending-subscriptions";
import {IonicModule} from "@ionic/angular";
import {SubscriptionService} from "../../../../services/subscription.service";
import {ToastService} from "../../../../services/toast.service";
import {CommonModule} from "@angular/common";
import {PhoneFormatPipe} from "../../../../shared/pipes/phone-format.pipe";
import {CurrencyFormatPipe} from "../../../../shared/pipes/currency-format.pipe";

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    PhoneFormatPipe,
    CurrencyFormatPipe
  ],
  providers: [SubscriptionService]
})
export class PendingRequestsComponent implements OnInit {
  @Input({required: true})
  pendingRequests!: PendingSubscriptions[];

  constructor(private subscriptionService: SubscriptionService,
              private toastService: ToastService) {
  }

  ngOnInit() {
  }

  declineSubscription(subscriptionId: number) {
    this.subscriptionService.declineSubscription(subscriptionId).subscribe({
      next: _ => {
        this.toastService.showSuccessToast('Mensalista recusado');
      },
      error: err => {
        this.toastService.showErrorToastAndLog('Problema ao recusar o mensalista', err);
      }
    })
  }

  acceptSubscription(subscriptionId: number) {
    this.subscriptionService.acceptSubscription(subscriptionId).subscribe({
      next: _ => {
        window.location.reload();
        this.toastService.showSuccessToast('Mensalista aceito');
      },
      error: err => {
        this.toastService.showErrorToastAndLog('Problema ao aceitar o mensalista', err);
      }
    })
  }

}
