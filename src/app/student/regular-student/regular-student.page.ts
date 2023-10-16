import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ToastController} from '@ionic/angular';
import {SubscriptionService} from "../../services/subscription.service";
import {StudentService} from "../../services/student.service";
import {Observable} from "rxjs";
import {PendingSubscriptions} from "../../shared/models/subscriptions/pending-subscriptions";
import {LoginResponse} from "../../shared/models/user/login-response.model";
import {LocalStorageService} from "../../services/local-storage.service";
import {StudentSubscription} from "../../shared/models/subscriptions/student-subscription";

@Component({
  selector: 'app-regular-student',
  templateUrl: './regular-student.page.html',
  styleUrls: ['./regular-student.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [SubscriptionService, StudentService]
})

export class RegularStudentPage implements OnInit {
  paymentStatus: boolean = true;
  pendingSubscriptions$!: Observable<PendingSubscriptions[]>
  studentSubscription$!: Observable<StudentSubscription>
  private loggedUser!: null | LoginResponse;

  constructor(private subscriptionService: SubscriptionService, private studentService: StudentService, private localStorageService: LocalStorageService, private toastController: ToastController) {
  }

  ngOnInit() {
    this.loggedUser = this.localStorageService.loggedUser;
    if (!this.loggedUser) {
      throw new Error("User is not logged in");
    }
    this.pendingSubscriptions$ = this.studentService.findPendingSubscriptions(this.loggedUser?.userId);
    this.studentSubscription$ = this.studentService.findStudentSubscription(this.loggedUser?.userId);
  }

  declineSubscription(subscriptionId: number) {
    this.subscriptionService.declineSubscription(subscriptionId).subscribe({
      next: _ => {
        this.toastController.create({
          message: 'Mensalista recusado',
          duration: 1000,
          position: 'top',
          color: 'success',
          icon: 'checkmark-outline'
        }).then(toast => toast.present());

      },
      error: err => {
        this.toastController.create({
          message: 'Erro ao concluir mensalista',
          duration: 1500,
          position: 'top',
          color: 'danger',
          icon: 'bug-outline'
        }).then(toast => toast.present());
      }
    })
  }

  acceptSubscription(subscriptionId: number) {
    this.subscriptionService.acceptSubscription(subscriptionId).subscribe({
      next: _ => {
        this.toastController.create({
          message: 'Mensalista aceito',
          duration: 1000,
          position: 'top',
          color: 'success',
          icon: 'checkmark-outline'
        }).then(toast => toast.present());

      },
      error: err => {
        this.toastController.create({
          message: 'Erro ao concluir mensalista',
          duration: 1500,
          position: 'top',
          color: 'danger',
          icon: 'bug-outline'
        }).then(toast => toast.present());
      }
    })
  }
}
