import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {StudentService} from "../../services/student.service";
import {Observable} from "rxjs";
import {PendingSubscriptions} from "../../shared/models/subscriptions/pending-subscriptions";
import {LoginResponse} from "../../shared/models/user/login-response.model";
import {StudentSubscription} from "../../shared/models/subscriptions/student-subscription";
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {ToastService} from "../../services/toast.service";
import {NotRegularStudentCardComponent} from "./components/not-regular-student-info/not-regular-student-card.component";
import {Student} from "../../shared/models/student/student";
import {PendingRequestsComponent} from "./components/pending-requests/pending-requests.component";
import {CurrencyFormatPipe} from "../../shared/pipes/currency-format.pipe";
import {PhoneFormatPipe} from "../../shared/pipes/phone-format.pipe";
import {LicensePlateFormatPipe} from "../../shared/pipes/license-plate-format.pipe";
import {RefreshService} from "../../services/refresh.service";
import {DateFormatPipeWsPipe} from "../../shared/pipes/date-format-pipe-ws.pipe";

@Component({
  selector: 'app-regular-student',
  templateUrl: './regular-student.page.html',
  styleUrls: ['./regular-student.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NotRegularStudentCardComponent, PendingRequestsComponent, CurrencyFormatPipe, DateFormatPipeWsPipe, PhoneFormatPipe, LicensePlateFormatPipe],
  providers: [StudentService, AuthenticationService, RefreshService]
})
export class RegularStudentPage implements OnInit {
  private loggedUser!: LoginResponse;

  pendingSubscriptions$!: Observable<PendingSubscriptions[]>
  studentSubscription$!: Observable<StudentSubscription>
  student!: Student;

  paymentStatus: boolean = true;

  constructor(private studentService: StudentService,
              private authService: AuthenticationService,
              private toastService: ToastService,
              private refreshService: RefreshService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loggedUser = this.authService.loggedUser!;
    const {userId} = this.loggedUser;

    this.studentService.findStudentById(userId).subscribe({
      next: data => this.student = data,
      error: err => {
        this.toastService.showErrorToastAndLog("Problema ao recuperar informações", err);
      }
    });

    this.pendingSubscriptions$ = this.studentService.findPendingSubscriptions(userId);
    this.studentSubscription$ = this.studentService.findStudentSubscription(userId);
  }

  onRefresh() {
    this.refreshService.handleRefresh();
  }
}
