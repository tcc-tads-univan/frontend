import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {LoginRequest} from "../../shared/models/user/login-request.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UserType} from "../../shared/enums/user-type";
import {ToastService} from 'src/app/services/toast.service';
import {UnivanLogoComponent} from "../../components/shared/univan-logo/univan-logo.component";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, UnivanLogoComponent],
  providers: [AuthenticationService, ToastService]
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
              private toastService: ToastService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    const loggedUser = this.authService.loggedUser;
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
          this.authService.saveAuthenticationInfo(response);
          this.redirectLoggedUser(response.userType);
        },
        error: err => {
          if (err.hasOwnProperty('error') && err.error.title === 'Email or password is invalid.') {
            this.toastService.showDangerToast('Email ou senha é inválido', 'key-outline');
          } else {
            this.toastService.showErrorToastAndLog("Houve um problema na autenticação", err);
          }
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
