import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterLink} from "@angular/router";
import {CarpoolService} from "../../services/carpool.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Observable} from "rxjs";
import {Schedule} from "../../shared/models/carpool/schedule";

@Component({
  selector: 'app-manage-carpool',
  templateUrl: './manage-carpool.page.html',
  styleUrls: ['./manage-carpool.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
  providers: [CarpoolService, AuthenticationService, AuthenticationService]
})
export class ManageCarpoolPage implements OnInit {
  driverId: number | undefined;
  username: string | undefined
  carpoolOngoing: boolean = true;
  schedules$!: Observable<Schedule[]>
  userId: number;
  private schedule: Schedule[] = [];

  currentDate: Date = new Date();

  startLocation: string;
  private middleLocation: string[] = [];
  finalLocation: string;

  constructor(private authService: AuthenticationService, private carpoolService: CarpoolService) {
    this.userId = this.authService.loggedUser!.userId;
    this.startLocation = 'teste';
    this.finalLocation = 'teste';
  }


  ngOnInit() {
    this.driverId = this.authService.loggedUser!.userId;
    this.username = this.authService.loggedUser!.name;

    this.schedules$! = this.carpoolService.listAcceptedDriverCarpool(this.driverId);
  }

  handleMiddleLocation() {
    this.middleLocation = []
  }

  redirectToMaps() {
  }

}
