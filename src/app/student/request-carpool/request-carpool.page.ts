import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CarpoolService} from "../../services/carpool.service";
import {Router} from "@angular/router";
import {CollegeService} from "../../services/college.service";
import {CollegeCampus} from "../../shared/models/college/college-campus";
import {convertDateToScheduleTime} from "../../shared/utils";
import {ToastService} from "../../services/toast.service";
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-request-carpool',
  templateUrl: './request-carpool.page.html',
  styleUrls: ['./request-carpool.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [CarpoolService, CollegeService, ToastService, AuthenticationService]
})
export class RequestCarpoolPage implements OnInit {
  private campiList: CollegeCampus[] = [];
  private currentHour = new Date().getHours();

  filteredCampiList: CollegeCampus[] = [];
  avaliableHours: number[] = [];

  selectedCampus!: CollegeCampus;
  selectedTimePeriod!: string;

  constructor(
    private carpoolService: CarpoolService,
    private collegeService: CollegeService,
    private authService: AuthenticationService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  ngOnInit() {
    for (let i = this.currentHour; i < 24; i++) {
      this.avaliableHours.push(i);
    }

    this.selectedTimePeriod = new Date().toTimeString();

    this.collegeService.findAllCampi().subscribe(
      campi => {
        this.campiList = campi;
        this.filteredCampiList = [...campi];
      }
    );
  }

  trackByItem(_idx: number, item: CollegeCampus) {
    return item.campusId;
  }

  handleInput(event: any) {
    if (this.filteredCampiList) {
      const query = event.target.value.toLowerCase();
      this.filteredCampiList = this.campiList.filter((c) => c.campusName!.toLowerCase().indexOf(query) > -1);
    }
  }

  handleSubmit() {
    if (this.selectedTimePeriod && this.selectedCampus) {
      const {campusId} = this.selectedCampus;
      const {userId} = this.authService.loggedUser!;

      this.carpoolService
        .requestCarpool(campusId, userId, convertDateToScheduleTime(new Date(this.selectedTimePeriod)))
        .subscribe({
          next: data => this.router.navigate(['/aluno/carona/atual'], {queryParams: {campus: campusId}}),
          error: err => this.toastService.showErrorToastAndLog("Problema ao solicitar a carona", err)
        });
    }
  }
}
