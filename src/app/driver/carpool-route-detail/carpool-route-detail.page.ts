import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {GoogleMapsModule, MapDirectionsService} from '@angular/google-maps';
import {map, Observable} from "rxjs";
import {CarpoolService} from "../../services/carpool.service";
import TravelMode = google.maps.TravelMode;
import DirectionsRequest = google.maps.DirectionsRequest;
import UnitSystem = google.maps.UnitSystem;
import DirectionsWaypoint = google.maps.DirectionsWaypoint;
import {ActivatedRoute} from "@angular/router";
import {ToastService} from "../../services/toast.service";
import {AuthenticationService} from 'src/app/services/authentication.service';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-carpool-route-detail',
  templateUrl: './carpool-route-detail.page.html',
  styleUrls: ['./carpool-route-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, GoogleMapsModule, HttpClientJsonpModule, HttpClientModule],
  providers: [CarpoolService, MapDirectionsService, AuthenticationService, ToastService]
})
export class CarpoolRouteDetailPage implements OnInit {
  directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;

  constructor(private carpoolService: CarpoolService,
              private mapDirectionsService: MapDirectionsService,
              private authService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    const driverId: number = this.authService.loggedUser!.userId;
    const studentId: number = +this.activatedRoute.snapshot.queryParamMap.get('aluno')!;
    const campusPlaceId: string = this.activatedRoute.snapshot.queryParamMap.get('campus')!;

    this.findRouteDirections(driverId, studentId, campusPlaceId);
  }

  private findRouteDirections(driverId: number, studentId: number, campusPlaceId: string) {
    this.carpoolService.findRouteDirections(driverId, studentId).subscribe({
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
}
