import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, ToastController} from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication.service";
import {LoginRequest} from "../../shared/models/user/login-request.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {LocalStorageService} from "../../services/local-storage.service";
import {UserType} from "../../shared/enums/user-type";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  providers: [AuthenticationService]
})
export class AuthenticationPage implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  registerRoutes = {
    driver: ['/motorista/cadastro'],
    student: ['/aluno/cadastro']
  }
  registerPath = this.registerRoutes.student;

  profileLandingRoutes = {
    driver: ['/motorista'],
    student: ['/aluno']
  }

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastController: ToastController,
              private localStorageService: LocalStorageService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    const loggedUser = this.localStorageService.loggedUser;
    if (loggedUser) {
      this.redirectLoggedUser(loggedUser.userType);
    } else {
      const selectedProfile = this.activatedRoute.snapshot.queryParamMap.get('p');

      if (selectedProfile === "motorista") {
        this.registerPath = this.registerRoutes.driver;
      } else {
        this.registerPath = this.registerRoutes.student;
      }
    }
  }

  private redirectLoggedUser(userType: UserType) {
      if (userType === UserType.DRIVER) {
        this.router.navigate(this.profileLandingRoutes.driver);
      }
      if (userType === UserType.STUDENT) {
        this.router.navigate(this.profileLandingRoutes.student);
      }
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      const request: LoginRequest = {
        email: this.email!.value ?? '',
        password: this.password!.value ?? ''
      };

      this.authService.authenticateUser(request).subscribe({
        next: response => {
          this.localStorageService.saveAuthenticationInfo(response);
          this.redirectLoggedUser(response.userType);
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
