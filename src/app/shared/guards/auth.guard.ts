import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from "../../services/local-storage.service";
import {LoginResponse} from "../models/user/login-response.model";
import {ToastController} from "@ionic/angular";
import {UserType} from "../enums/user-type";


@Injectable()
export class AuthGuardService {
  constructor(private router: Router,
              private localStorageService: LocalStorageService,
              private toastController: ToastController) {
  }

  studentIsAuthenticated() {
    const loggedUser = this.localStorageService.loggedUser;

    if (loggedUser && loggedUser.userType === UserType.STUDENT) {
      return true;
    }

    let errorMessage: string;
    let route: string[];

    if (!loggedUser) {
      errorMessage = "Você precisa estar autenticado";
      route = ['/'];
    } else {
      errorMessage = "Você não tem autorização para essa ação";
      route = ['/motorista'];
    }

    this.toastController.create({
      message: errorMessage,
      duration: 1000,
      position: 'top',
      color: 'danger',
      icon: 'close-circle-outline'
    }).then(toast => toast.present());
    this.router.navigate(route);

    return false;
  }

  driverIsAuthenticated() {
    const loggedUser = this.localStorageService.loggedUser;

    if (loggedUser && loggedUser.userType === UserType.DRIVER) {
      return true;
    }

    let errorMessage: string;
    let route: string[];

    if (!loggedUser) {
      errorMessage = "Você precisa estar autenticado";
      route = ['/'];
    } else {
      errorMessage = "Você não tem autorização para essa ação";
      route = ['/aluno'];
    }

    this.toastController.create({
      message: errorMessage,
      duration: 1000,
      position: 'top',
      color: 'danger',
      icon: 'close-circle-outline'
    }).then(toast => toast.present());
    this.router.navigate(route);

    return false;
  }

}

export const driverAuthentication = (): boolean => inject(AuthGuardService).driverIsAuthenticated()
export const studentAuthentication = (): boolean => inject(AuthGuardService).studentIsAuthenticated()
