import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ToastController} from '@ionic/angular';
import {SubscriptionService} from "../../services/subscription.service";
import {StudentService} from "../../services/student.service";
import {Observable} from "rxjs";
import {PendingSubscriptions} from "../../shared/models/subscriptions/pending-subscriptions";
import {LoginResponse} from "../../shared/models/user/login-response.model";
import {StudentSubscription} from "../../shared/models/subscriptions/student-subscription";
import {AuthenticationService} from 'src/app/services/authentication.service';
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-regular-student',
  templateUrl: './regular-student.page.html',
  styleUrls: ['./regular-student.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [SubscriptionService, StudentService, AuthenticationService]
})
export class RegularStudentPage implements OnInit {
  paymentStatus: boolean = true;
  pendingSubscriptions$!: Observable<PendingSubscriptions[]>
  studentSubscription$!: Observable<StudentSubscription>
  private loggedUser!: null | LoginResponse;

  constructor(private subscriptionService: SubscriptionService,
              private studentService: StudentService,
              private authService: AuthenticationService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.loggedUser = this.authService.loggedUser;
    if (!this.loggedUser) {
      throw new Error("User is not logged in");
    }
    this.pendingSubscriptions$ = this.studentService.findPendingSubscriptions(this.loggedUser?.userId);
    this.studentSubscription$ = this.studentService.findStudentSubscription(this.loggedUser?.userId);
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
