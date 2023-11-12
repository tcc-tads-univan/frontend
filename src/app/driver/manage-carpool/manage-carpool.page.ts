import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {RouterLink} from "@angular/router";
import {CarpoolService} from "../../services/carpool.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";

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
  constructor(private authService: AuthenticationService) { }


  ngOnInit() {
    this.driverId = this.authService.loggedUser!.userId;
    this.username = this.authService.loggedUser!.name;
  }

}
