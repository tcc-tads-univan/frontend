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
import {Rating} from "../../shared/models/rating/rating";

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
  isModalOpen: boolean = false;

  rankForm = this.fb.group({
    tripStars: [1, [Validators.required]],
  });

  readonly tripStars = [
    {value: 1, text: "1"},
    {value: 2, text: "2"},
    {value: 3, text: "3"},
    {value: 4, text: "4"},
    {value: 5, text: "5"},
  ]

  constructor(private authService: AuthenticationService, private carpoolService: CarpoolService, private toastService: ToastService, private collegeService: CollegeService, private mapDirectionsService: MapDirectionsService,
              private historyService: HistoryService, private router: Router, private fb: FormBuilder, private studentService: StudentService
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

  finishTrip() {
    this.historyService.finishTrip(this.userId, this.studentsId[0]).subscribe(
      next => {
        this.carpoolStarted = false;
        this.setOpen(true);
      },
      error => {
        this.toastService.showErrorToastAndLog("Houve algum erro ao finalizar a carona", error);
      }
    )

  }

  ratingStudent() {
    if (this.rankForm.valid) {
      const rating: Rating = {
        rating: this.rating!.value ?? 1,
      }

      this.studentService.rankStudent(this.studentsId[0], rating).subscribe(
        next => {
          this.toastService.showSuccessToast("Carona finalizada com sucesso!");
          this.router.navigate(['/motorista']);
        },
      error => {
        this.toastService.showErrorToastAndLog("Houve algum erro ao avaliar o aluno", error);
      }
      )
    }

  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  public get rating() {
    return this.rankForm.get('tripStars');
  }
}

