import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {DriverService} from "../../services/driver.service";
import {Observable} from "rxjs";
import {DriverSubscriptions} from "../../shared/models/subscriptions/driver-subscriptions";
import {RegularStudent} from "../../shared/models/regular-student/regular-student";
import {RouterLink} from "@angular/router";
import {AuthenticationService} from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register-edit-regular-student',
  templateUrl: './register-edit-regular-student.page.html',
  styleUrls: ['./register-edit-regular-student.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
  providers: [DriverService, AuthenticationService]
})
export class RegisterEditRegularStudentPage implements OnInit {
  private driverId!: number;
  username: string | undefined;
  isModalOpen: boolean = false;

  subscriptions$!: Observable<DriverSubscriptions>;
  regularStudent$!: Observable<RegularStudent>;

  constructor(private driverService: DriverService, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.driverId = this.authService.loggedUser!.userId;
    this.username = this.authService.loggedUser!.name;

    this.subscriptions$! = this.driverService.findDriverSubscriptions(this.driverId);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  handleModal(subscriptionId: number) {
    this.regularStudent$! = this.driverService.findDriverSubscriptionsById(this.driverId, subscriptionId)
    this.setOpen(true);
    console.log(this.regularStudent$);
  }


}
