import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {GoogleMapsModule} from '@angular/google-maps';
import {HttpClient, HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";

@Component({
  selector: 'app-carpool-route-detail',
  templateUrl: './carpool-route-detail.page.html',
  styleUrls: ['./carpool-route-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, GoogleMapsModule, HttpClientModule, HttpClientJsonpModule]
})
export class CarpoolRouteDetailPage implements OnInit {
  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBxE3WWoAjcEUk4ttI1La96XO_JeWzXdM4', 'callback')
      .pipe(
        map(() => {
          console.log('oi')
          return true;
        }),
        catchError(() => {
          console.log('tchau')
          return of(false)
        }),
      );
  }

  ngOnInit(): void {
  }
}
