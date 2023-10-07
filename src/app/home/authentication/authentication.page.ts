import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, ToastController} from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication.service";
import {LoginDTO} from "../../shared/models/user/login-dto.model";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../services/local-storage.service";
import {UserType} from "../../shared/enums/user-type";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [AuthenticationService]
})
export class AuthenticationPage implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastController: ToastController,
              private localStorageService: LocalStorageService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      const request: LoginDTO = {
        email: this.email!.value ?? '',
        password: this.password!.value ?? ''
      };

      this.authService.authenticateUser(request).subscribe({
        next: res => {
          this.localStorageService.saveAuthenticationInfo(res);

          if (res.userType == UserType.DRIVER) {
            this.router.navigate(['/motorista']);
          }
          if (res.userType == UserType.STUDENT) {
            this.router.navigate(['/aluno']);
          }
        },
        error: err => {
          if (err.error.title === 'Email or password is invalid.') {
            this.toastController.create({
              message: 'Email ou senha é inválido',
              duration: 1500,
              position: 'top',
              color: 'danger',
              icon: 'key-outline'
            }).then(toast => toast.present());
          } else {
            this.toastController.create({
              message: err.error.title,
              duration: 1500,
              position: 'top',
              color: 'danger',
              icon: 'bug-outline'
            }).then(toast => toast.present());
          }

          console.error(`[${err.status}] ${err.message}`);
        }
      });
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
