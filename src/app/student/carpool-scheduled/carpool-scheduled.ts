import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CarpoolService} from "../../services/carpool.service";
import {Schedule} from "../../shared/models/carpool/schedule";
import {Observable} from "rxjs";
import {ActivatedRoute, RouterLink} from '@angular/router';
import {PhoneFormatPipe} from "../../shared/pipes/phone-format.pipe";
import {RefreshService} from "../../services/refresh.service";

@Component({
  selector: 'app-carpool-scheduled',
  templateUrl: './carpool-scheduled.html',
  styleUrls: ['./carpool-scheduled.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, PhoneFormatPipe],
  providers: [CarpoolService, RefreshService]
})
export class CarpoolScheduled implements OnInit {
  schedule$!: Observable<Schedule>;

  constructor(private carpoolService: CarpoolService, private activatedRoute: ActivatedRoute, private refreshService: RefreshService) {
  }

  ngOnInit() {
    const scheduleId = +this.activatedRoute.snapshot.queryParamMap.get('carona')!;
    this.schedule$ = this.carpoolService.findScheduleById(scheduleId);
  }

  onRefresh() {
    this.refreshService.handleRefreshForStudent();
  }
}
