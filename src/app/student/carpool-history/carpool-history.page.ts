import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {HistoryService} from "../../services/history.service";
import {Observable} from "rxjs";
import {CarpoolHistory} from "../../shared/models/history/carpoolHistory";
import {AuthenticationService} from 'src/app/services/authentication.service';

@Component({
  selector: 'app-carpool-history',
  templateUrl: './carpool-history.page.html',
  styleUrls: ['./carpool-history.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [HistoryService, AuthenticationService]
})
export class CarpoolHistoryPage implements OnInit {
  stars: number | undefined;
  tripsHistory$!: Observable<CarpoolHistory[]>

  constructor(private historyService: HistoryService, private authService: AuthenticationService) {
  }

  ngOnInit() {
    const {userId, userType} = this.authService.loggedUser!;
    this.tripsHistory$ = this.historyService.getCarpoolHistory(userId, userType);
    this.stars = 3;
  }

}
