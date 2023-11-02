import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {HistoryService} from "../../services/history.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {LoginResponse} from "../../shared/models/user/login-response.model";
import {Observable} from "rxjs";
import {History} from "../../shared/models/history/history";

@Component({
  selector: 'app-carpool-history',
  templateUrl: './carpool-history.page.html',
  styleUrls: ['./carpool-history.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [HistoryService]
})
export class CarpoolHistoryPage implements OnInit {
  stars: number | undefined;
  userType = 1;
  private loggedUser!: LoginResponse | null;
  tripsHistory$!: Observable<History[]>
  constructor(private historyService: HistoryService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.stars = 3;
    this.loggedUser = this.localStorageService.loggedUser;
    // @ts-ignore
    this.tripsHistory$ = this.historyService.getCarpoolHistory(this.loggedUser?.userId, this.userType)

  }

}
