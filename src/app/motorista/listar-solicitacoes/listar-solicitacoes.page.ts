import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ToastController} from '@ionic/angular';
import {CaronaService} from "../../services/carona.service";
import {SolicitacaoCaronaDTO} from "../../shared/models/solicitacao-carona-dto.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-listar-solicitacoes',
  templateUrl: './listar-solicitacoes.page.html',
  styleUrls: ['./listar-solicitacoes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [CaronaService]
})
export class ListarSolicitacoesPage implements OnInit {
  solicitacoesCarona$!: Observable<SolicitacaoCaronaDTO[]>;

  constructor(private caronaService: CaronaService, private toastController: ToastController) {
  }

  ngOnInit() {
    this.solicitacoesCarona$ = this.caronaService.buscarSolicitacoesCaronaPorCampus(1);
  }

  trackByItem(index: number, item: SolicitacaoCaronaDTO) {
    return item.userId;
  }

  async aprovarSolicitacaoCarona(idAluno: number) {
    console.log("Aprovada a solicitação de carona do aluno=", idAluno);
    // this.caronaService.aprovarSolicitacaoCarona(idAluno);
    this.toastController.create({
      message: "Aluno ID=" + idAluno + " aprovado",
      duration: 1500,
      position: "bottom",
      color: "success"
    }).then(t => t.present());
  }
}
