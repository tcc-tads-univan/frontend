import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CarpoolService} from "../../services/carpool.service";
import {Observable} from "rxjs";
import {CarpoolDetails} from "../../shared/models/carpool/carpool-details";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from 'src/app/services/toast.service';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-carpool-requested',
  templateUrl: './carpool-requested.page.html',
  styleUrls: ['./carpool-requested.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [CarpoolService, ToastService, AuthenticationService]
})
export class CarpoolRequestedPage implements OnInit {
  requestedCarpool$!: Observable<CarpoolDetails>;
  studentId!: number;
  campusId!: number;

  public alertButtons = [
    {
      text: 'Não',
      role: 'cancel',
    },
    {
      text: 'Sim',
      role: 'confirm',
      handler: () => {
        this.cancelCarpoolRequest();
      },
    },
  ];

  constructor(private carpoolService: CarpoolService,
              private authService: AuthenticationService,
              private toastService: ToastService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.campusId = +this.activatedRoute.snapshot.queryParamMap.get('campus')!;
    this.studentId = this.authService.loggedUser!.userId;

    this.requestedCarpool$ = this.carpoolService.findCarpoolRequestByStudentAndCampus(this.studentId, this.campusId);
  }

  cancelCarpoolRequest() {
    this.carpoolService
      .cancelCarpoolRequest(this.studentId, this.campusId)
      .subscribe({
        next: _data => {
          this.toastService.showSuccessToast('Carona cancelada com sucesso');
          this.router.navigate(['/aluno']);
        },
        error: err => this.toastService.showErrorToastAndLog('Erro ao cancelar a carona', err)
      });
  }

  setResult(ev: any) {
    console.log(`Finalizado o popup de confirmação: ${ev.detail.role}`);
  }
}
