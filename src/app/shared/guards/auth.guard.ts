import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserType} from "../enums/user-type";
import {ToastService} from 'src/app/services/toast.service';
import {LocalStorageKeys} from "../enums/local-storage-keys";
import {LoginResponse} from "../models/user/login-response.model";

@Injectable()
export class AuthGuardService {
  private errorMessage: string = "Você precisa estar autenticado";
  private redirectRoute: string[] = ['/'];

  constructor(private router: Router,
              private toastService: ToastService) {
  }

  isUserLoggedInAndAuthorized(authorizedProfile: UserType, redirectTo: string[]): boolean {
    return true;

    const value = localStorage.getItem(LocalStorageKeys.AUTH);

    if (value) {
      const loggedUser = JSON.parse(value!) as LoginResponse;

      if (loggedUser) {
        if (authorizedProfile === loggedUser.userType) {
          return true;
        } else {
          this.errorMessage = "Você não tem autorização para essa ação";
          this.redirectRoute = redirectTo;
        }
      }

      this.toastService.showDangerToast(this.errorMessage, 'close-circle-outline');
      this.router.navigate(this.redirectRoute);
    }

    return false;
  }
}

export const driverAuthentication = () => inject(AuthGuardService).isUserLoggedInAndAuthorized(UserType.DRIVER, ['/aluno']);
export const studentAuthentication = () => inject(AuthGuardService).isUserLoggedInAndAuthorized(UserType.STUDENT, ['/motorista']);
