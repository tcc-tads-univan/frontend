import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {SubscriptionService} from "../../services/subscription.service";
import {StudentService} from "../../services/student.service";
import {Observable} from "rxjs";
import {PendingSubscriptions} from "../../shared/models/subscriptions/pending-subscriptions";

@Component({
  selector: 'app-regular-student',
  templateUrl: './regular-student.page.html',
  styleUrls: ['./regular-student.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [SubscriptionService, StudentService]
})
export class RegularStudentPage implements OnInit {
  studentId = 12;
  paymentStatus: boolean = true;
  pendingSubscriptions$!:  Observable<PendingSubscriptions>
  constructor(private subscriptionService: SubscriptionService, private studentService: StudentService) { }

  ngOnInit() {
    this.pendingSubscriptions$! = this.studentService.findPendingSubscriptions(this.studentId);
  }
  declineSubscription(subscriptionId: number) {
    this.subscriptionService.declineSubscription(subscriptionId);
  }
  acceptSubscription(subscriptionId: number) {
    this.subscriptionService.acceptSubscription(subscriptionId);
  }
}
