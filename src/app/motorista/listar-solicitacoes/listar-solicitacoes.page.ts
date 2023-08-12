import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ToastController} from '@ionic/angular';
import {CarpoolService} from "../../services/carpool.service";
import {SolicitacaoCaronaDTO} from "../../shared/models/solicitacao-carona-dto.model";
import {Observable} from "rxjs";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-listar-solicitacoes',
  templateUrl: './listar-solicitacoes.page.html',
  styleUrls: ['./listar-solicitacoes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [CarpoolService]
})
export class ListarSolicitacoesPage implements OnInit {
  solicitacoesCarona$!: Observable<SolicitacaoCaronaDTO[]>;

  // POC
  constructor(private carpoolService: CarpoolService, private toastController: ToastController, private poc: LocalStorageService) {
  }

  ngOnInit() {
    this.solicitacoesCarona$ = this.carpoolService.buscarSolicitacoesCaronaPorCampus(this.poc.getCarpoolInfo().campusId);
  }

  trackByItem(index: number, item: SolicitacaoCaronaDTO) {
    return item.studentId;
  }

  async aprovarSolicitacaoCarona(idAluno: number) {
    this.carpoolService.aprovarSolicitacaoCarona(idAluno).subscribe(_ => {
      console.log("Solicitado");
    });

    this.toastController.create({
      message: "Aluno ID=" + idAluno + " aprovado",
      duration: 1500,
      position: "bottom",
      color: "success"
    }).then(t => t.present());
  }
}
