import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {DriverService} from "../../services/driver.service";
import {RegularStudentRegistration} from "../../shared/models/regular-student/regular-student-registration";
import {Router} from "@angular/router";
import {ToastService} from 'src/app/services/toast.service';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {HttpStatusCode} from "@angular/common/http";
import {MaskitoOptions} from "@maskito/core";
import {MaskitoModule} from "@maskito/angular";
import {CurrencyFormatDirective} from "../../shared/directives/currency-format.directive";

@Component({
  selector: 'app-add-regular-student',
  templateUrl: './add-regular-student.page.html',
  styleUrls: ['./add-regular-student.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, MaskitoModule, CurrencyFormatDirective],
  providers: [DriverService, ToastService, AuthenticationService]
})
export class AddRegularStudentPage implements OnInit {
  private driverId!: number;
  readonly expirationDays = [
    {value: 1, text: "Dia 01"},
    {value: 5, text: "Dia 05"},
    {value: 15, text: "Dia 15"},
  ]
  readonly brlMask: MaskitoOptions = {
    mask: ['R', '$', ' ', /\d/, '.', /\d/, /\d/, /\d/, ',',  '0', '0'],  };

  regularStudentForm = this.fb.group({
    studentId: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]],
    monthlyFee: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
    expirationDay: [1, [Validators.required]],
  });

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private driverService: DriverService,
              private toastService: ToastService,
              private router: Router) {
  }

  ngOnInit() {
    this.driverId = this.authService.loggedUser!.userId;
  }

  handleSubmit() {
    if (this.regularStudentForm.valid) {
      const regularStudent: RegularStudentRegistration = {
        driverId: this.driverId,
        studentId: parseInt(this.student?.value ?? ''),
        monthlyFee: parseFloat(this.monthlyFee?.value ?? ''),
        expirationDay: this.expirationDay!.value ?? 1,
      }

      this.createRegularStudent(regularStudent);
    }
  }

  createRegularStudent(regularStudent: RegularStudentRegistration) {
    this.driverService.inviteStudent(regularStudent).subscribe({
      next: _data => {
        this.toastService.showSuccessToast('Novo mensalista adicionado com sucesso');
        this.router.navigate(['/motorista']);
      },
      error: err => {
        if (err.error) {
          if (err.error.status === HttpStatusCode.Conflict) {
            this.toastService.showDangerToast('Esse aluno já é um mensalista de outro motorista', 'alert-circle-outline');
          }

          if (err.error.status === HttpStatusCode.BadRequest && err.error.title === "The driver doesn't have a vehicle.") {
            this.toastService.showDangerToast('Você precisa ter uma van cadastrada', 'alert-circle-outline');
          }
        } else {
          this.toastService.showErrorToastAndLog('Erro ao concluir adicionar o mensalista', err);
        }
      }
    });
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
