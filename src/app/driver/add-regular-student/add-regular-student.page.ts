import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, ToastController} from '@ionic/angular';
import {LoginResponse} from "../../shared/models/user/login-response.model";
import {LocalStorageService} from "../../services/local-storage.service";
import {DriverService} from "../../services/driver.service";
import {RegularStudentRegistration} from "../../shared/models/regular-student/regular-student-registration";
import {Router} from "@angular/router";
import {convertDateToScheduleTime} from "../../shared/utils";

@Component({
  selector: 'app-add-regular-student',
  templateUrl: './add-regular-student.page.html',
  styleUrls: ['./add-regular-student.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [DriverService]
})
export class AddRegularStudentPage implements OnInit {

  regularStudentForm = this.fb.group({
    studentId: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    monthlyFee: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
    expirationDay: ['', [Validators.required, Validators.min(1), Validators.max(31), Validators.pattern(/^\d+$/)]],
  });

  private loggedUser!: LoginResponse | null;
  driverId: number = 0;

  constructor(private fb: FormBuilder,
              private localStorageService: LocalStorageService,
              private driverService: DriverService,
              private toastController: ToastController,
              private router: Router) {
  }

  ngOnInit() {
     this.loggedUser = this.localStorageService.loggedUser;
      if (!this.loggedUser) {
        throw new Error("User is not logged in");
      }
      this.driverId = this.loggedUser.userId;
  }

  handleSubmit() {
    if (this.regularStudentForm.valid) {
      const regularStudent: RegularStudentRegistration = {
        driverId: this.driverId,
        studentId: parseInt(this.student?.value ?? ''),
        monthlyFee: parseFloat(this.monthlyFee?.value ?? ''),
        expirationDay: parseInt(this.expirationDay?.value ?? ''),
      }

      this.createRegularStudent(regularStudent);
    }
  }

  createRegularStudent(regularStudent: RegularStudentRegistration) {
    this.driverService.inviteStudent(regularStudent).subscribe({
      next: data => {
        this.toastController.create({
          message: 'Cadastro concluído!',
          duration: 1000,
          position: 'top',
          color: 'success',
          icon: 'checkmark-outline'
        }).then(toast => toast.present());

        this.router.navigate(['/motorista']);
      },
      error: err => {
        this.toastController.create({
          message: 'Erro ao concluir o cadastro do Aluno',
          duration: 1500,
          position: 'top',
          color: 'danger',
          icon: 'bug-outline'
        }).then(toast => toast.present());

        console.error(`[${err.status}] ${err.message}`);
      }
    })
  }

  public get monthlyFee() {
    return this.regularStudentForm.get('monthlyFee');
  }

  public get expirationDay() {
    return this.regularStudentForm.get('expirationDay');
  }

  public get student() {
    return this.regularStudentForm.get('studentId');
  }

}
