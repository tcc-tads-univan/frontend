import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {LocalStorageService} from "../../services/local-storage.service";
import {Agendamento} from "../../shared/models/agendamento.model";

@Component({
  selector: 'app-carona-confirmada',
  templateUrl: './carona-confirmada.page.html',
  styleUrls: ['./carona-confirmada.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [LocalStorageService]
})
export class CaronaConfirmadaPage implements OnInit {
  agendamento!: Agendamento;

  constructor(private poc: LocalStorageService) { }

  ngOnInit() {
    this.agendamento = this.poc.fuzilarOMateusWosniaki();
  }

}
