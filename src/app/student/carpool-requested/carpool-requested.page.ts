import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {SolicitacaoCaronaDTO} from "../../shared/models/solicitacao-carona-dto.model";
import {CarpoolService} from "../../services/carpool.service";
import {Observable} from "rxjs";
import {LocalStorageService} from "../../services/local-storage.service";
import {CarpoolDetails} from "../../shared/models/carpool/carpool-details";

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

  constructor(private carpoolService: CarpoolService, private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.storedData = this.localStorageService.getCarpoolInfo();
    this.requestedCarpool$ = this.carpoolService.findCarpoolRequestByStudentAndCampus(this.storedData.studentId, this.storedData.campusId);
  }

  cancelCarpoolRequest() {
    this.carpoolService
      .cancelCarpoolRequest(this.storedData.studentId, this.storedData.campusId)
      .subscribe({
        next: value => console.log('Solicitaçao cancelada com sucesso'),
        error: err => console.error(`[${err.status}] ${err.message}`)
      });
  }

}
