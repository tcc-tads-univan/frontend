import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ToastController} from '@ionic/angular';
import {CarpoolService} from "../../services/carpool.service";
import {Observable} from "rxjs";
import {LocalStorageService} from "../../services/local-storage.service";
import {CarpoolDetails} from "../../shared/models/carpool/carpool-details";
import {Router} from "@angular/router";

@Component({
  selector: 'app-carpool-requested',
  templateUrl: './carpool-requested.page.html',
  styleUrls: ['./carpool-requested.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [CarpoolService, LocalStorageService]
})
export class CarpoolRequestedPage implements OnInit {
  requestedCarpool$!: Observable<CarpoolDetails>;
  storedData!: { studentId: number, campusId: number };

  public alertButtons = [
    {
      text: 'Não',
      role: 'cancel',
    },
    {
      text: 'Sim',
      role: 'confirm',
      handler: () => {
        this.cancelCarpoolRequest();
      },
    },
  ];

  constructor(private carpoolService: CarpoolService,
              private localStorageService: LocalStorageService,
              private toastController: ToastController,
              private router: Router) {
  }

  ngOnInit() {
    this.storedData = this.localStorageService.getCarpool();
    this.requestedCarpool$ = this.carpoolService.findCarpoolRequestByStudentAndCampus(this.storedData.studentId, this.storedData.campusId);
  }

  cancelCarpoolRequest() {
    this.carpoolService
      .cancelCarpoolRequest(this.storedData.studentId, this.storedData.campusId)
      .subscribe({
        next: _data => {
          this.toastController.create({
            message: 'Carona cancelada com sucesso',
            duration: 1500,
            position: 'top',
            color: 'success',
            icon: 'checkmark-outline'
          }).then(toast => toast.present());

          this.router.navigate(['/aluno']);
        },
        error: err => {
          this.toastController.create({
            message: 'Erro ao cancelar a carona',
            duration: 1500,
            position: 'top',
            color: 'danger',
            icon: 'bug-outline'
          }).then(toast => toast.present());
          console.error(`[${err.status}] ${err.message}`);
        }
      });
  }

  setResult(ev: any) {
    console.log(`Finalizado o popup de confirmação: ${ev.detail.role}`);
  }
}
