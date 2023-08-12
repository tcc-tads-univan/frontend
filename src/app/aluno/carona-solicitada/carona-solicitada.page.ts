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
  templateUrl: './carona-solicitada.page.html',
  styleUrls: ['./carona-solicitada.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [CarpoolService, LocalStorageService]
})
export class CaronaSolicitadaPage implements OnInit {
  caronaSolicitada$!: Observable<SolicitacaoCaronaDTO>;
  caronaStorage!: {studentId: number, campusId: number}; // POC

  // POC
  constructor(private carpoolService: CarpoolService, private poc: LocalStorageService) {
  }

  ngOnInit() {
    this.caronaStorage = this.poc.getCarpoolInfo(); // POC
    this.caronaSolicitada$ = this.carpoolService.findCarpoolRequestByStudentAndCampus(this.caronaStorage.studentId, this.caronaStorage.campusId);
  }

  cancelarSolicitacaoCarona(studentId: number, campusId: number) {
    this.carpoolService.cancelarSolicitacaoCarona(studentId, campusId).subscribe(
      _ => {
        console.log('Solicitaçao cancelada com sucesso');
      }
    );
  }

}
