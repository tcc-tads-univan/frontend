import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterLink} from "@angular/router";
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
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  passwordVisible = false;

  constructor(private fb: FormBuilder, private driverService: DriverService) {
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
      }

      this.driverService.registerDriver(driver).subscribe(
        res => console.log(res)
      );
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
}
