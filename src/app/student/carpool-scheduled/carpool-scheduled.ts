import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {LocalStorageService} from "../../services/local-storage.service";
import {Agendamento} from "../../shared/models/agendamento.model";
import {CarpoolService} from "../../services/carpool.service";
import {Schedule} from "../../shared/models/carpool/schedule";
import {Observable} from "rxjs";

@Component({
  selector: 'app-carpool-scheduled',
  templateUrl: './carpool-scheduled.html',
  styleUrls: ['./carpool-scheduled.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [CarpoolService]
})
export class CarpoolScheduled implements OnInit {
  agendamento!: Observable<Schedule>;

  constructor(private carpoolService: CarpoolService) { }

  ngOnInit() {
    this.agendamento = this.carpoolService.getScheduleInfo();
  }

}
