import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ToastController} from '@ionic/angular';
import {CarpoolService} from "../../services/carpool.service";
import {SolicitacaoCaronaDTO} from "../../shared/models/solicitacao-carona-dto.model";
import {Observable} from "rxjs";
import {LocalStorageService} from "../../services/local-storage.service";
import {RequestedCarpool} from "../../shared/models/carpool/requested-carpool";
import {Router} from "@angular/router";

@Component({
  selector: 'app-carpool-requests',
  templateUrl: './carpool-requests.page.html',
  styleUrls: ['./carpool-requests.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [CarpoolService]
})
export class CarpoolRequestsPage implements OnInit {
  requestedCarpools$!: Observable<RequestedCarpool[]>;

  constructor(
    private carpoolService: CarpoolService,
    private toastController: ToastController,
    private localStorageService: LocalStorageService, // POC
    private router: Router
  ) {
  }

  ngOnInit() {
    this.requestedCarpools$ = this.carpoolService.findCarpoolRequestsByCampus(this.localStorageService.getCarpoolInfo().campusId);
  }

  trackByItem(idx: number, item: RequestedCarpool) {
    return item.studentId;
  }

  approveCarpoolRequest(studentId: number) {
    this.carpoolService
      .approveCarpoolRequest(studentId)
      .subscribe({
        next: data => {
          this.router.navigate(['/motorista']);
        },
        error: err => {
          this.toastController.create({
            message: "Problema ao aceitar a carona",
            duration: 1500,
            position: "bottom",
            color: "danger",
            icon: "bug-outline"
          }).then(toast => toast.present());

          console.error(`[${err.status}] ${err.message}`);
        }
      });
  }
}
