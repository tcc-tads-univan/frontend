import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {DriverService} from "../../services/driver.service";
import {RegularStudentRegistration} from "../../shared/models/regular-student/regular-student-registration";
import {Router} from "@angular/router";
import {ToastService} from 'src/app/services/toast.service';
import {AuthenticationService} from 'src/app/services/authentication.service';

@Component({
  selector: 'app-add-regular-student',
  templateUrl: './add-regular-student.page.html',
  styleUrls: ['./add-regular-student.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [DriverService, ToastService, AuthenticationService]
})
export class AddRegularStudentPage implements OnInit {
  private userId!: number;

  regularStudentForm = this.fb.group({
    studentId: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    monthlyFee: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
    expirationDay: ['', [Validators.required, Validators.min(1), Validators.max(31), Validators.pattern(/^\d+$/)]],
  });

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private driverService: DriverService,
              private toastService: ToastService,
              private router: Router) {
  }

  ngOnInit() {
    this.userId = this.authService.loggedUser!.userId;
  }

  handleSubmit() {
    if (this.regularStudentForm.valid) {
      const regularStudent: RegularStudentRegistration = {
        driverId: this.userId,
        studentId: parseInt(this.student?.value ?? ''),
        monthlyFee: parseFloat(this.monthlyFee?.value ?? ''),
        expirationDay: parseInt(this.expirationDay?.value ?? ''),
      }

      this.createRegularStudent(regularStudent);
    }
  }

  createRegularStudent(regularStudent: RegularStudentRegistration) {
    this.driverService.inviteStudent(regularStudent).subscribe({
      next: _data => {
        this.toastService.showSuccessToast('Cadastro concluído');
        this.router.navigate(['/motorista']);
      },
      error: err => {
        this.toastService.showErrorToastAndLog('Erro ao concluir o cadastro do Aluno', err);
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
