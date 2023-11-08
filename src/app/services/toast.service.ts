import {Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private debug: boolean = true;

  constructor(private toastController: ToastController, private httpClient: HttpClient) {
  }

  showSuccessToast(message: string, position?: "top" | "bottom") {
    this.toastController.create({
      message: message,
      duration: 1500,
      position: position ?? "top",
      color: "success",
      icon: "checkmark-outline"
    }).then(toast => toast.present());
  }

  showErrorToastAndLog(message: string, error: Error, position?: "top" | "bottom") {
    this.toastController.create({
      message: message,
      duration: 1500,
      position: position ?? "bottom",
      color: "danger",
      icon: "bug-outline"
    }).then(toast => toast.present());

    console.error(error.message);
    if (this.debug) {
      console.warn(error);
    }
  }

  showDangerToast(message: string, icon: string, position?: "top" | "bottom") {
    this.toastController.create({
      message: message,
      duration: 1500,
      position: position ?? "bottom",
      color: "danger",
      icon: icon
    }).then(toast => toast.present());
  }

  showWarningToast(message: string, icon: string, position?: "top" | "bottom") {
    this.toastController.create({
      message: message,
      duration: 1500,
      position: position ?? "bottom",
      color: "warning",
      icon: icon
    }).then(toast => toast.present());
  }
}
