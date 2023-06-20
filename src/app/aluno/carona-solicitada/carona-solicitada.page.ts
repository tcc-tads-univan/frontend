import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {SolicitacaoCaronaDTO} from "../../shared/models/solicitacao-carona-dto.model";
import {CaronaService} from "../../services/carona.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-carona-solicitada',
  templateUrl: './carona-solicitada.page.html',
  styleUrls: ['./carona-solicitada.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [CaronaService]
})
export class CaronaSolicitadaPage implements OnInit {
  caronaSolicitada$!: Observable<SolicitacaoCaronaDTO>;

  constructor(private caronaService: CaronaService) {
  }

  ngOnInit() {
    this.caronaSolicitada$ = this.caronaService.buscarSolicitacaoCaronaPorCampusEAluno(1, 1);
  }

  cancelarSolicitacaoCarona(idAluno: number, idCampus: number) {
    this.caronaService.cancelarSolicitacaoCarona(idAluno, idCampus).subscribe(
      sucesso => {
        console.log('Solicitaçao cancelada com sucesso');
      }
    );
  }

}
