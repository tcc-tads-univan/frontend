import {Component, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {EmptyHistoryCardComponent} from "../../../components/shared/empty-history-card/empty-history-card.component";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {ToastService} from "../../../services/toast.service";
import {HistoryService} from "../../../services/history.service";
import {UserType} from "../../enums/user-type";
import {CarpoolHistory} from "../../models/history/carpoolHistory";
import {DateFormatPipe} from "../../pipes/date-format.pipe";
import {CurrencyFormatPipe} from "../../pipes/currency-format.pipe";

@Component({
    selector: 'app-carpool-history',
    templateUrl: './carpool-history.page.html',
    styleUrls: ['./carpool-history.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, EmptyHistoryCardComponent, DateFormatPipe, CurrencyPipe, CurrencyFormatPipe],
    providers: [AuthenticationService, HistoryService, ToastService]
})
export class CarpoolHistoryPage implements OnInit {
    isEmpty = true;
    tripsHistory: CarpoolHistory[] = [];
    findCarpoolRoute!: string[];
    userType!: UserType;

    constructor(private authService: AuthenticationService,
                private historyService: HistoryService,
                private toastService: ToastService) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        const {userId, userType} = this.authService.loggedUser!;
        this.userType = userType;
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

    protected readonly UserType = UserType;
}
