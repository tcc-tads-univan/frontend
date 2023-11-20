import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CarpoolService} from "../../services/carpool.service";
import {Observable} from "rxjs";
import {RequestedCarpool} from "../../shared/models/carpool/requested-carpool";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ToastService} from "../../services/toast.service";
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {PhoneFormatPipe} from "../../shared/pipes/phone-format.pipe";

@Component({
  selector: 'app-carpool-requests',
  templateUrl: './carpool-requests.page.html',
  styleUrls: ['./carpool-requests.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, PhoneFormatPipe],
  providers: [CarpoolService, ToastService, AuthenticationService]
})
export class CarpoolRequestsPage implements OnInit {
  requestedCarpools$!: Observable<RequestedCarpool[]>;
  campusId!: number;
  campusPlaceId!: string | null;

  constructor(
    private carpoolService: CarpoolService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.campusPlaceId = this.activatedRoute.snapshot.queryParamMap.get('origem');
    this.campusId = +this.activatedRoute.snapshot.queryParamMap.get('campus')!;
  }

  ionViewWillEnter() {
    this.requestedCarpools$ = this.carpoolService.findCarpoolRequestsByCampus(this.campusId);
  }

  trackByItem(idx: number, item: RequestedCarpool) {
    return item.studentId;
  }
}
