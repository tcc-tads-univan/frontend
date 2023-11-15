import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CarpoolService} from "../../services/carpool.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {Schedule} from "../../shared/models/carpool/schedule";
import {ToastService} from 'src/app/services/toast.service';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {LocalStorageKeys} from "../../shared/enums/local-storage-keys";
import {CarpoolStatusInfo} from "../../shared/models/carpool/carpool-status-info";
import {CarpoolStatus} from "../../shared/enums/carpool-status";

@Component({
  selector: 'app-validate-carpool-proposal',
  templateUrl: './validate-carpool-proposal.page.html',
  styleUrls: ['./validate-carpool-proposal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [CarpoolService, AuthenticationService, ToastService]
})
export class ValidateCarpoolProposalPage implements OnInit {
  schedule$!: Observable<Schedule>;

  constructor(private carpoolService: CarpoolService,
              private authService: AuthenticationService,
              private router: Router,
              private toastService: ToastService) {
  }

  ngOnInit() {
    const {userId} = this.authService.loggedUser!;
    this.schedule$ = this.carpoolService.findScheduleByStudentId(userId);
  }

  approveScheduleProposal(scheduleId: number) {
    this.carpoolService.approveSchedule(scheduleId)
      .subscribe({
        next: _data => {
          const carpoolStatusJson = localStorage.getItem(LocalStorageKeys.CARPOOL);
          if (carpoolStatusJson) {

            const carpoolStatusInfo = JSON.parse(carpoolStatusJson) as CarpoolStatusInfo;
            carpoolStatusInfo.status = CarpoolStatus.TRAVELING;
            carpoolStatusInfo.lastUpdated = new Date();
            carpoolStatusInfo.scheduleId = scheduleId;

            localStorage.setItem(LocalStorageKeys.CARPOOL, JSON.stringify(carpoolStatusInfo));

            this.toastService.showSuccessToast('Carona confirmada');
            this.router.navigate(['/aluno/carona/confirmada'], {queryParams: {carona: scheduleId}});
          }
        },
        error: err => {
          this.toastService.showErrorToastAndLog('Ocorreu um problema ao aceitar a carona', err);
        }
      });
  }

  declineSchedulePropostal(scheduleId: number) {
    this.carpoolService.declineSchedule(scheduleId)
      .subscribe({
        next: _data => {
          const carpoolStatusJson = localStorage.getItem(LocalStorageKeys.CARPOOL);
          if (carpoolStatusJson) {
            const carpoolStatusInfo = JSON.parse(carpoolStatusJson) as CarpoolStatusInfo;

            this.toastService.showSuccessToast('Proposta recusada com sucesso');
            this.router.navigate(['/aluno/carona/solicitada'], {queryParams: {campus: carpoolStatusInfo.originId}});
          }
        },
        error: err => {
          this.toastService.showErrorToastAndLog('Ocorreu um problema ao recusar essa proposta', err);
        }
      });
  }
}
