import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {SolicitacaoCaronaDTO} from "../../shared/models/solicitacao-carona-dto.model";
import {CaronaService} from "../../services/carona.service";
import {Observable} from "rxjs";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-carona-solicitada',
  templateUrl: './carona-solicitada.page.html',
  styleUrls: ['./carona-solicitada.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [CaronaService, LocalStorageService]
})
export class CaronaSolicitadaPage implements OnInit {
  caronaSolicitada$!: Observable<SolicitacaoCaronaDTO>;
  caronaStorage!: {idAluno: number, idCampus: number}; // POC

  // POC
  constructor(private caronaService: CaronaService, private poc: LocalStorageService) {
  }

  ngOnInit() {
    this.caronaStorage = this.poc.recuperarCarona(); // POC
    this.caronaSolicitada$ = this.caronaService.buscarSolicitacaoCaronaPorCampusEAluno(this.caronaStorage.idAluno, this.caronaStorage.idCampus);
  }

  cancelarSolicitacaoCarona(idAluno: number, idCampus: number) {
    this.caronaService.cancelarSolicitacaoCarona(idAluno, idCampus).subscribe(
      _ => {
        console.log('Solicitaçao cancelada com sucesso');
      }
    );
  }

}
