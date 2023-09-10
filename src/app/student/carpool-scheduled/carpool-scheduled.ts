import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {CarpoolService} from "../../services/carpool.service";
import {Schedule} from "../../shared/models/carpool/schedule";
import {Observable} from "rxjs";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-carpool-scheduled',
  templateUrl: './carpool-scheduled.html',
  styleUrls: ['./carpool-scheduled.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [CarpoolService, LocalStorageService]
})
export class CarpoolScheduled implements OnInit {
  schedule$!: Observable<Schedule>;

  constructor(private carpoolService: CarpoolService,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    const scheduleId = this.localStorageService.getSchedule().scheduleId;
    this.schedule$ = this.carpoolService.findScheduleById(scheduleId);
  }

}
