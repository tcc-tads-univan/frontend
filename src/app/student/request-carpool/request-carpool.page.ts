import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ToastController} from '@ionic/angular';
import {CarpoolService} from "../../services/carpool.service";
import {Router} from "@angular/router";
import {CollegeService} from "../../services/college.service";
import {CollegeCampus} from "../../shared/models/college/college-campus";
import {convertDateToScheduleTime} from "../../shared/utils";

@Component({
  selector: 'app-request-carpool',
  templateUrl: './request-carpool.page.html',
  styleUrls: ['./request-carpool.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [CarpoolService, CollegeService]
})
export class RequestCarpoolPage implements OnInit {
  private campiList: CollegeCampus[] = [];
  private currentHour = new Date().getHours();

  public filteredCampiList: CollegeCampus[] = [];
  public avaliableHours: number[] = [];

  public selectedTimePeriod!: string;
  public selectedCampus!: CollegeCampus;

  constructor(
    private carpoolService: CarpoolService,
    private collegeService: CollegeService,
    private router: Router,
    private toastController: ToastController
  ) {
  }

  ngOnInit() {
    for (let i = this.currentHour; i < 24; i++) {
      this.avaliableHours.push(i);
    }

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
      this.carpoolService
        .requestCarpool(this.selectedCampus, convertDateToScheduleTime(new Date(this.selectedTimePeriod)))
        .subscribe({
          next: data => this.router.navigate(['/aluno/carona/atual']),
          error: err => {
            this.toastController.create({
              message: 'Erro ao solicitar a carona!',
              duration: 1500,
              position: 'top',
              color: 'danger',
              icon: 'bug-outline'
            }).then(toast => toast.present());

            console.error(`[${err.status}] ${err.message}`);
          }
        });
    }
  }
}
