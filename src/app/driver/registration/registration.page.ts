import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, ToastController} from '@ionic/angular';
import {Router, RouterLink} from "@angular/router";
import {DriverService} from "../../services/driver.service";
import {DriverRegistration} from "../../shared/models/driver/driver-registration";

@Component({
  selector: 'app-driver-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  providers: [DriverService]
})
export class RegistrationPage implements OnInit {
  registrationForm = this.fb.group({
    name: ['', [Validators.minLength(5), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phonenumber: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    cnh: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    birthdate: ['', [Validators.required]]
  });

  passwordVisible = false;

  constructor(private fb: FormBuilder,
              private driverService: DriverService,
              private router: Router,
              private toastController: ToastController) {
  }

  ngOnInit() {
  }

  handleSubmit() {
    if (this.registrationForm.valid) {
      const driver: DriverRegistration = {
        name: this.name?.value ?? '',
        cpf: this.cpf?.value ?? '',
        cnh: this.cnh?.value ?? '',
        phonenumber: this.phonenumber?.value ?? '',
        email: this.email?.value ?? '',
        password: this.password?.value ?? '',
        birthdate: this.birthdate?.value ?? ''
      }

      this.driverService.registerDriver(driver).subscribe({
        next: _ => {
          this.toastController.create({
            message: 'Cadastro concluído!',
            duration: 1000,
            position: 'top',
            color: 'success',
            icon: 'checkmark-outline'
          }).then(toast => toast.present());

          this.router.navigate(['/']);
        },
        error: err => {
          this.toastController.create({
            message: 'Erro ao concluir o seu cadastro',
            duration: 1500,
            position: 'top',
            color: 'danger',
            icon: 'bug-outline'
          }).then(toast => toast.present());

          console.error(`[${err.status}] ${err.message}`);
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get cpf() {
    return this.registrationForm.get('cpf');
  }

  get cnh() {
    return this.registrationForm.get('cnh');
  }

  get phonenumber() {
    return this.registrationForm.get('phonenumber');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get birthdate() {
    return this.registrationForm.get('birthdate');
  }
}
