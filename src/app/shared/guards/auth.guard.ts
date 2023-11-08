import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from "../../services/local-storage.service";
import {ToastController} from "@ionic/angular";
import {UserType} from "../enums/user-type";

@Injectable()
export class AuthGuardService {
  private errorMessage: string = "Você precisa estar autenticado";
  private redirectRoute: string[] = ['/'];

  constructor(private router: Router,
              private localStorageService: LocalStorageService,
              private toastController: ToastController) {
  }

  isUserLoggedInAndAuthorized(authorizedProfile: UserType, redirectTo: string[]): boolean {
    return true;

    const loggedUser = this.localStorageService.loggedUser;

    if (loggedUser) {
      if (authorizedProfile === loggedUser!.userType) {
        return true;
      } else {
        this.errorMessage = "Você não tem autorização para essa ação";
        this.redirectRoute = redirectTo;
      }
    }

    this.toastController.create({
      message: this.errorMessage,
      duration: 1000,
      position: 'top',
      color: 'danger',
      icon: 'close-circle-outline'
    }).then(toast => toast.present());
    this.router.navigate(this.redirectRoute);

    return false;
  }
}

export const driverAuthentication = () => inject(AuthGuardService).isUserLoggedInAndAuthorized(UserType.DRIVER, ['/aluno']);
export const studentAuthentication = () => inject(AuthGuardService).isUserLoggedInAndAuthorized(UserType.STUDENT, ['/motorista']);
