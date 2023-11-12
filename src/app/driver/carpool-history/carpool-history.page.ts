import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {HistoryService} from "../../services/history.service";
import {CarpoolHistory} from "../../shared/models/history/carpoolHistory";
import {AuthenticationService} from 'src/app/services/authentication.service';
import {ToastService} from "../../services/toast.service";
import {RouterLink} from "@angular/router";
import {EmptyHistoryCardComponent} from "../../shared/components/empty-history-card/empty-history-card.component";

@Component({
  selector: 'app-carpool-history',
  templateUrl: './carpool-history.page.html',
  styleUrls: ['./carpool-history.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, EmptyHistoryCardComponent],
  providers: [HistoryService, AuthenticationService, ToastService]
})
export class CarpoolHistoryPage implements OnInit {
  tripsHistory!: CarpoolHistory[];
  isEmpty = false;

  constructor(private historyService: HistoryService,
              private toastService: ToastService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    const {userId, userType} = this.authService.loggedUser!;
    this.historyService.getCarpoolHistory(userId, userType).subscribe({
      next: data => {
        if (data.length === 0) {
          this.isEmpty = true;
        }
        this.tripsHistory = data;
      },
      error: err => this.toastService.showErrorToastAndLog("Problema ao recuperar o histórico", err)
    });
  }
}
