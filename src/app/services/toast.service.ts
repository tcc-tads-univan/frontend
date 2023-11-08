import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastController: ToastController) { }

  showSuccessToast(message: string, position?: "top" | "bottom") {
    this.toastController.create({
      message: message,
      duration: 1500,
      position: position ?? "top",
      color: "success",
      icon: "checkmark-outline"
    }).then(toast => toast.present());
  }

  showErrorToastAndLog(message: string, error: HttpErrorResponse, position?: "top" | "bottom") {
    this.toastController.create({
      message: message,
      duration: 1500,
      position: position ?? "bottom",
      color: "danger",
      icon: "bug-outline"
    }).then(toast => toast.present());

    console.error(`HttpErrorResponse: ${error}`);
  }
}
