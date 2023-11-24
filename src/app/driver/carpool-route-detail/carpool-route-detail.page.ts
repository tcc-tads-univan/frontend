import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {GoogleMapsModule, MapDirectionsService} from '@angular/google-maps';
import {map, Observable} from "rxjs";
import {CarpoolService} from "../../services/carpool.service";
import TravelMode = google.maps.TravelMode;
import DirectionsRequest = google.maps.DirectionsRequest;
import UnitSystem = google.maps.UnitSystem;
import DirectionsWaypoint = google.maps.DirectionsWaypoint;
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../services/toast.service";
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {HttpClientModule} from "@angular/common/http";
import {CollegeService} from "../../services/college.service";
import {CollegeCampus} from "../../shared/models/college/college-campus";
import {Student} from "../../shared/models/student/student";
import {StudentService} from "../../services/student.service";
import {DriverService} from "../../services/driver.service";
import {Address} from "../../shared/models/address/address";
import {RefreshService} from "../../services/refresh.service";

@Component({
  selector: 'app-carpool-route-detail',
  templateUrl: './carpool-route-detail.page.html',
  styleUrls: ['./carpool-route-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, GoogleMapsModule, HttpClientModule, ReactiveFormsModule],
  providers: [CarpoolService, MapDirectionsService, AuthenticationService, ToastService, CollegeService, StudentService, DriverService]
})
export class CarpoolRouteDetailPage implements OnInit {
  price = new FormControl('', [Validators.required, Validators.min(5.0)]);
  driverId!: number;

  studentId!: number;
  student!: Student;
  studentAddress$!: Observable<Address>;

  campusId!: number;
  campus!: CollegeCampus;

  directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;

  constructor(private carpoolService: CarpoolService,
              private collegeService: CollegeService,
              private driverService: DriverService,
              private studentService: StudentService,
              private mapDirectionsService: MapDirectionsService,
              private authService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private toastService: ToastService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.driverId = this.authService.loggedUser!.userId;

    this.validateDriverHasVehicle();

    this.studentId = +this.activatedRoute.snapshot.queryParamMap.get('aluno')!;
    this.campusId = +this.activatedRoute.snapshot.queryParamMap.get('campus')!;

    this.studentService.findStudentById(this.studentId).subscribe({
      next: data => {
        this.student = data;

        this.studentAddress$ = this.studentService.findStudentAddress(this.studentId, this.student.addressId);

        this.collegeService.findCampusById(this.campusId).subscribe({
          next: data => {
            this.campus = data;

            this.findRouteDirections(this.driverId, this.studentId, this.campus.placeId);
          },
          error: err => this.toastService.showErrorToastAndLog("Problema ao recuperar informações do campus", err)
        });
      },
      error: err => this.toastService.showErrorToastAndLog("Problema ao recuperar informações do aluno", err)
    });
  }

  private validateDriverHasVehicle() {
    this.driverService.findDriverById(this.driverId).subscribe({
      next: data => {
        if (data.vehicleId === 0) {
          this.toastService.showWarningToast("Você precisa cadastrar uma van para aceitar caronas", "alert-circle-outline");
          this.router.navigate(['/motorista/van']);
        }
      },
      error: err => {
        this.toastService.showErrorToastAndLog("Erro ao recuperar suas informações", err);
        this.router.navigate(['/motorista'])
      }
    });
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
            waypoints: response.waypoints.map(waypoint => ({location: {placeId: waypoint.placeId}} as DirectionsWaypoint))
          };

          this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result));
        },
        error: err => this.toastService.showErrorToastAndLog("Problema ao pesquisar a rota", err)
      });
  }

  submitCarpoolProposal() {
    if (this.price.valid && this.price.value) {
      const priceValue = +this.price.value ? (+this.price.value).toFixed(2) : (0.0).toFixed(2);

      this.carpoolService.approveCarpoolRequest(this.studentId, this.driverId, this.campusId, priceValue)
        .subscribe({
          next: _data => {
            this.toastService.showSuccessToast("Carona aceita com sucesso");
            this.router.navigate(['/motorista']);
          },
          error: err => this.toastService.showErrorToastAndLog("Problema ao aceitar a carona", err)
        });
    }
  }
}
