import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {Router, RouterLink} from "@angular/router";
import {CarpoolService} from "../../services/carpool.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {map, Observable} from "rxjs";
import {Schedule} from "../../shared/models/carpool/schedule";
import {ToastService} from "../../services/toast.service";
import {CollegeService} from "../../services/college.service";
import {CollegeCampus} from "../../shared/models/college/college-campus";
import DirectionsRequest = google.maps.DirectionsRequest;
import TravelMode = google.maps.TravelMode;
import UnitSystem = google.maps.UnitSystem;
import DirectionsWaypoint = google.maps.DirectionsWaypoint;
import {GoogleMapsModule, MapDirectionsService} from "@angular/google-maps";
import {HistoryService} from "../../services/history.service";
import {StudentService} from "../../services/student.service";
import {UserType} from "../../shared/enums/user-type";
import {LocalStorageKeys} from "../../shared/enums/local-storage-keys";

@Component({
  selector: 'app-manage-carpool',
  templateUrl: './manage-carpool.page.html',
  styleUrls: ['./manage-carpool.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, GoogleMapsModule, ReactiveFormsModule],
  providers: [CarpoolService, AuthenticationService, AuthenticationService, CollegeService, MapDirectionsService, HistoryService, StudentService]

})
export class ManageCarpoolPage implements OnInit {
  driverId: number | undefined;
  username: string | undefined
  carpoolStarted: boolean = false;
  schedules!: Schedule[];
  userId: number;
  currentDate: Date = new Date();
  studentsId!: number[];
  campus!: CollegeCampus;
  directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;
  scheduleId!: number;

  constructor(private authService: AuthenticationService, private carpoolService: CarpoolService, private toastService: ToastService, private collegeService: CollegeService, private mapDirectionsService: MapDirectionsService,
              private router: Router
  ) {
    this.userId = this.authService.loggedUser!.userId;
  }


  ngOnInit() {
    this.driverId = this.authService.loggedUser!.userId;
    this.username = this.authService.loggedUser!.name;

    this.carpoolService.listAcceptedDriverCarpool(this.driverId).subscribe(
      {
        next: value => {
          this.schedules = value;
          this.studentsId = value.map(schedule => schedule.student.studentId);
          this.scheduleId = value.length > 0 ? value[0].scheduleId : 0;
        }
      }
    )
  }

  private findRouteDirections(driverId: number, studentId: number, campusPlaceId: string) {
    this.carpoolService.findRouteDirections(driverId, studentId)
      .subscribe({
        next: response => {
          const request: DirectionsRequest = {
            destination: {placeId: response.destination},
            origin: {placeId: campusPlaceId},
            travelMode: TravelMode.DRIVING,
            language: 'pt-BR',
            unitSystem: UnitSystem.METRIC,
            optimizeWaypoints: true,
            waypoints: response.waypoints.map(waypoint => ({location: {placeId: waypoint}} as DirectionsWaypoint))
          };
          this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result));
        },
        error: err => this.toastService.showErrorToastAndLog("Problema ao pesquisar a rota", err)
      });
  }

  redirectToMaps() {
    this.collegeService.findCampusById(1).subscribe({
      next: data => {
        this.findRouteDirections(this.userId, this.studentsId[0], data.placeId);
        this.carpoolStarted = true;
      },
      error: err => {
        this.toastService.showErrorToastAndLog("Erro recuperando informação do campus.", err);
      }
    });
  }

  finishTrip(scheduleId: number) {
    this.carpoolService.completeTrip(scheduleId).subscribe(
      next => {
        this.carpoolStarted = false;
        localStorage.removeItem(LocalStorageKeys.CARPOOL);
        this.router.navigate(['motorista/caronas/avaliar'], {
          queryParams: {
            userId: this.studentsId[0],
            userType: UserType.DRIVER
          }
        })
      },
      error => {
        this.toastService.showErrorToastAndLog("Houve algum erro ao finalizar a carona", error);
      }
    )

  }

}

