import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {SolicitacaoCaronaDTO} from "../../shared/models/solicitacao-carona-dto.model";
import {CarpoolService} from "../../services/carpool.service";
import {Observable} from "rxjs";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-carona-solicitada',
  templateUrl: './carpool-requested.page.html',
  styleUrls: ['./carpool-requested.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [CarpoolService, LocalStorageService]
})
export class CarpoolRequestedPage implements OnInit {
  carpoolRequest$!: Observable<SolicitacaoCaronaDTO>;
  carpoolStorage!: {studentId: number, campusId: number}; // POC

  // POC
  constructor(private carpoolService: CarpoolService, private poc: LocalStorageService) {
  }

  ngOnInit() {
    this.carpoolStorage = this.poc.getCarpoolInfo(); // POC
    this.carpoolRequest$ = this.carpoolService.findCarpoolRequestByStudentAndCampus(this.carpoolStorage.studentId, this.carpoolStorage.campusId);
  }

  cancelCarpoolRequest(studentId: number, campusId: number) {
    this.carpoolService.cancelCarpoolRequest(studentId, campusId).subscribe(
      _ => {
        console.log('Solicitaçao cancelada com sucesso');
      }
    );
  }

}
