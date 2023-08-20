import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {LocalStorageService} from "../../services/local-storage.service";
import {Agendamento} from "../../shared/models/agendamento.model";

@Component({
  selector: 'app-carpool-scheduled',
  templateUrl: './carpool-scheduled.html',
  styleUrls: ['./carpool-scheduled.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [LocalStorageService]
})
export class CarpoolScheduled implements OnInit {
  agendamento!: Agendamento;

  constructor(private poc: LocalStorageService) { }

  ngOnInit() {
    this.agendamento = this.poc.fuzilarOMateusWosniaki();
  }

}
