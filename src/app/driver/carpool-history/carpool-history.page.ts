import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {HistoryService} from "../../services/history.service";
import {History} from "../../shared/models/history/history";
import {AuthenticationService} from 'src/app/services/authentication.service';
import {ToastService} from "../../services/toast.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-carpool-history',
  templateUrl: './carpool-history.page.html',
  styleUrls: ['./carpool-history.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
  providers: [HistoryService, AuthenticationService, ToastService]
})
export class CarpoolHistoryPage implements OnInit {
  tripsHistory!: History[];
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
