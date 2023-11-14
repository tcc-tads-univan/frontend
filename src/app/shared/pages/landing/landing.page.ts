import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {LandingPageHeaderComponent} from "../../../components/shared/landing-page-header/landing-page-header.component";
import {RouterLink} from "@angular/router";
import {StudentAddressComponent} from "../../../components/student/student-address/student-address.component";
import {LadingPageNavigation} from "../../utils/lading-page-navigation";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {StudentService} from "../../../services/student.service";
import {UserType} from "../../enums/user-type";
import {Student} from "../../models/student/student";
import {Driver} from "../../models/driver/driver";
import {DriverService} from "../../../services/driver.service";
import {ToastService} from "../../../services/toast.service";
import {Address} from "../../models/address/address";
import {Observable} from "rxjs";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, LandingPageHeaderComponent, RouterLink, StudentAddressComponent],
  providers: [AuthenticationService, DriverService, StudentService, ToastService]
})
export class LandingPage implements OnInit {
  userFirstName!: string;
  navigations!: LadingPageNavigation[];

  actionNeeded = true;
  warningMessage!: string;

  isDriver = false;
  isStudent = false;

  driver!: Driver;
  student!: Student;
  studentAddress$!: Observable<Address>;

  constructor(private authService: AuthenticationService,
              private driverService: DriverService,
              private studentService: StudentService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    const loggedUser = this.authService.loggedUser!;
    this.userFirstName = loggedUser.name;

    if (loggedUser.userType === UserType.DRIVER) {
      this.setDriverLandingPage(loggedUser.userId);
    }

    if (loggedUser.userType === UserType.STUDENT) {
      this.setStudentLandingPage(loggedUser.userId);
    }
  }

  private setStudentLandingPage(userId: number) {
    this.isStudent = true;
    this.warningMessage = "Você precisa cadastrar um endereço para solicitar caronas";

    this.navigations = [
      {description: 'Editar Perfil', icon: 'person-outline', url: ['../perfil']},
      {description: 'Mensalista', icon: 'wallet-outline', url: ['../mensalista']},
      {description: 'Histórico', icon: 'calendar-outline', url: ['../carona/historico']},
    ];

    this.studentService.findStudentById(userId).subscribe({
      next: data => {
        this.student = data;
        this.actionNeeded = data.addressId === null || data.addressId === 0;
        this.studentAddress$ = this.studentService.findStudentAddress(data.id, data.addressId);
      },
      error: err => {
        this.toastService.showErrorToastAndLog("Problema ao recuperar suas informações", err);
      }
    });
  }

  private setDriverLandingPage(userId: number) {
    this.isDriver = true;
    this.warningMessage = "Você precisa cadastrar uma van para oferecer caronas";

    this.navigations = [
      {description: "Editar Perfil", icon: "person-outline", url: ['../perfil']},
      {description: "Minha Van", icon: "bus-outline", url: ['../van']},
      {description: "Mensalistas", icon: "people-outline", url: ['../mensalistas/']},
      {description: "Histórico", icon: "calendar-outline", url: ['../caronas/historico']},
    ];

    this.driverService.findDriverById(userId).subscribe({
      next: data => {
        this.driver = data;
        this.actionNeeded = data.vehicleId === null || data.vehicleId === 0;
      },
      error: err => {
        this.toastService.showErrorToastAndLog("Problema ao recuperar suas informações", err);
      }
    });
  }
}