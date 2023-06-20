import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, IonInput} from '@ionic/angular';
import {IonSearchbarCustomEvent} from "@ionic/core/dist/types/components";
import {CaronaService} from "../../services/carona.service";
import {Campus} from "../../shared/models/campus.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-solicitar-carona',
  templateUrl: './solicitar-carona.page.html',
  styleUrls: ['./solicitar-carona.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [CaronaService]
})
export class SolicitarCaronaPage implements OnInit {
  public campi: Campus[] = [
    {
      universidade: 'Universidade Federal do Paraná',
      lineAddress: 'Rua João Assef 1010'
    },
    {
      universidade: 'Pontifícia Universidade Católica do Paraná',
      lineAddress: 'Rua João Assef 1011'
    }
  ];
  public campiFiltrado = [...this.campi];

  public horariosDisponiveis: number[] = [];
  private _horarioAtual = new Date().getHours();

  periodoSelecionado!: string;
  campusSelecionado!: Campus;

  constructor(private caronaService: CaronaService, private router: Router) {
  }

  ngOnInit() {
    for (let i = this._horarioAtual; i < 24; i++) {
      this.horariosDisponiveis.push(i);
    }
  }

  trackByItem(index: number, item: Campus) {
    return item.lineAddress;
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.campiFiltrado = this.campi.filter((c) => c.universidade.toLowerCase().indexOf(query) > -1);
  }

  handleSubmit() {
    if (this.periodoSelecionado && this.campusSelecionado) {
      const campus: string = this.campusSelecionado.universidade === 'Universidade Federal do Paraná' ? '1' : '2';
      this.caronaService.solicitarCarona(`Aluno ${new Date()}`, campus, this.campusSelecionado.lineAddress, this.periodoSelecionado).subscribe(
        _ => { console.log("Solicitado com sucesso!"); }
      );
      this.router.navigate(['/']);
    }
  }
}
