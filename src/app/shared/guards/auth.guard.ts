import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from "../../services/local-storage.service";
import {LoginResponse} from "../models/user/login-response.model";
import {ToastController} from "@ionic/angular";
import {UserType} from "../enums/user-type";


@Injectable()
export class AuthGuardService {
  private loggedUser!: null | LoginResponse;

  constructor(private router: Router,
              private localStorageService: LocalStorageService,
              private toastController: ToastController) {
    this.loggedUser = this.localStorageService.loggedUser;
  }

  studentIsAuthenticated() {
    if (this.loggedUser && this.loggedUser.userType === UserType.STUDENT) {
      return true;
    }

    let errorMessage: string;
    let route: string[];

    if (!this.loggedUser) {
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
    if (this.loggedUser && this.loggedUser.userType === UserType.DRIVER) {
      return true;
    }

    let errorMessage: string;
    let route: string[];

    if (!this.loggedUser) {
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
