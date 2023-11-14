import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {EmptyHistoryCardComponent} from "../../../components/shared/empty-history-card/empty-history-card.component";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {ToastService} from "../../../services/toast.service";
import {HistoryService} from "../../../services/history.service";
import {UserType} from "../../enums/user-type";
import {CarpoolHistory} from "../../models/history/carpoolHistory";

@Component({
  selector: 'app-carpool-history',
  templateUrl: './carpool-history.page.html',
  styleUrls: ['./carpool-history.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, EmptyHistoryCardComponent],
  providers: [AuthenticationService, HistoryService, ToastService]
})
export class CarpoolHistoryPage implements OnInit {
  isEmpty = true;
  tripsHistory: CarpoolHistory[] = [];
  findCarpoolRoute!: string[];

  constructor(private authService: AuthenticationService,
              private historyService: HistoryService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    const {userId, userType} = this.authService.loggedUser!;

    if (userType === UserType.DRIVER) {
      this.findCarpoolRoute = ['/motorista/caronas/procurar'];
    } else {
      this.findCarpoolRoute = ['/aluno/carona'];
    }

    this.historyService.getCarpoolHistory(userId, userType).subscribe({
      next: data => {
        if (data.length > 0) {
          this.isEmpty = false;
        }
        this.tripsHistory = data;
      },
      error: err => this.toastService.showErrorToastAndLog("Problema ao recuperar o histórico", err)
    });
  }

}
