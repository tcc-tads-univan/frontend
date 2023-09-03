import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {StudentRegistration} from "../../shared/models/student/student-registration";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-student-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink]
})
export class RegistrationPage implements OnInit {
  registrationForm = this.fb.group({
    name: ['', [Validators.minLength(5), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phonenumber: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  passwordVisible = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  handleSubmit() {
    if (this.registrationForm.valid) {
      const student: StudentRegistration = {
        name: this.name?.value ?? '',
        cpf: this.cpf?.value ?? '',
        phonenumber: this.phonenumber?.value ?? '',
        email: this.email?.value ?? '',
        password: this.password?.value ?? '',
      }

      console.log(student);
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
