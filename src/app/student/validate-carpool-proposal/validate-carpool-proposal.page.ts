import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ToastController} from '@ionic/angular';
import {CarpoolService} from "../../services/carpool.service";
import {Observable} from "rxjs";
import {LocalStorageService} from "../../services/local-storage.service";
import {Router} from "@angular/router";
import {Schedule} from "../../shared/models/carpool/schedule";

@Component({
  selector: 'app-validate-carpool-proposal',
  templateUrl: './validate-carpool-proposal.page.html',
  styleUrls: ['./validate-carpool-proposal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [CarpoolService, LocalStorageService]
})
export class ValidateCarpoolProposalPage implements OnInit {
  schedule$!: Observable<Schedule>;

  constructor(private carpoolService: CarpoolService,
              private localStorageService: LocalStorageService,
              private router: Router,
              private toastController: ToastController) {
  }

  ngOnInit() {
    const studentId = this.localStorageService.getUserInfo().studentId; // poc
    this.schedule$ = this.carpoolService.findScheduleByStudentId(studentId);
  }

  approveScheduleProposal(carpoolId: number) {
    this.carpoolService.approveSchedule(carpoolId)
      .subscribe({
        next: _data => {
          this.toastController.create({
            message: 'Carona confirmada!',
            duration: 1000,
            position: 'top',
            color: 'success',
            icon: 'checkmark-outline'
          }).then(toast => toast.present());

          this.router.navigate(['/aluno/carona-confirmada']);
        },
        error: err => {
          this.toastController.create({
            message: 'Erro ao aceitar a carona!',
            duration: 1500,
            position: 'top',
            color: 'danger',
            icon: 'bug-outline'
          }).then(toast => toast.present());
        }
      });
  }

  declineSchedulePropostal(carpoolId: number) {
    this.carpoolService.declineSchedule(carpoolId)
      .subscribe({
        next: _data => {
          this.toastController.create({
            message: 'Proposta recusada com sucesso!',
            duration: 1000,
            position: 'top',
            color: 'warning',
            icon: 'alert-circle-outline'
          }).then(toast => toast.present());

          this.router.navigate(['/aluno']);
        },
        error: err => {
          this.toastController.create({
            message: 'Erro ao recusar a carona!',
            duration: 1500,
            position: 'top',
            color: 'danger',
            icon: 'bug-outline'
          }).then(toast => toast.present());
        }
      });
  }
}
