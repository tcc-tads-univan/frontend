import {inject, Injectable} from '@angular/core';
import { Router, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import {LocalStorageService} from "../../services/local-storage.service";
import {LoginResponse} from "../models/user/login-response.model";
import {ToastController} from "@ionic/angular";


@Injectable()
export class AuthGuardService {
  private loggedUser!: null | LoginResponse;

  constructor(private router: Router, private localStorageService: LocalStorageService, private toastController: ToastController ) {
    this.loggedUser = this.localStorageService.loggedUser;
  }

  studentIsAuthenticated() {
    if (!this.loggedUser) {
      this.toastController.create({
        message: 'Você não está logado!',
        duration: 1000,
        position: 'top',
        color: 'danger',
        icon: 'checkmark-outline'
      }).then(toast => toast.present());
      this.router.navigate(['/']);
      return false;
    }
    if (this.loggedUser.userType !== "STUDENT") {
      this.toastController.create({
        message: 'Você não tem permissão para isso!',
        duration: 1000,
        position: 'top',
        color: 'danger',
        icon: 'checkmark-outline'
      }).then(toast => toast.present());
      this.router.navigate(['/motorista']);
      return false;
    }
    return true;
  }
  driverIsAuthenticated() {
    if (!this.loggedUser) {
      this.toastController.create({
        message: 'Você não está logado!',
        duration: 1000,
        position: 'top',
        color: 'danger',
        icon: 'checkmark-outline'
      }).then(toast => toast.present());
      this.router.navigate(['/']);
      return false;
    }
    if (this.loggedUser.userType !== "DRIVER") {
      this.toastController.create({
        message: 'Você não tem permissão para isso!',
        duration: 1000,
        position: 'top',
        color: 'danger',
        icon: 'checkmark-outline'
      }).then(toast => toast.present());

      this.router.navigate(['/aluno']);
      return false;
    }
    return true;
  }

}
export const driverAuthentication = (): boolean => inject(AuthGuardService).driverIsAuthenticated()
export const studentAuthentication = (): boolean => inject(AuthGuardService).studentIsAuthenticated()
