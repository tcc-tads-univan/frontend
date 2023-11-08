import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CarpoolService} from "../../services/carpool.service";
import {Observable} from "rxjs";
import {RequestedCarpool} from "../../shared/models/carpool/requested-carpool";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ToastService} from "../../services/toast.service";
import {AuthenticationService} from 'src/app/services/authentication.service';

@Component({
  selector: 'app-carpool-requests',
  templateUrl: './carpool-requests.page.html',
  styleUrls: ['./carpool-requests.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
  providers: [CarpoolService, ToastService, AuthenticationService]
})
export class CarpoolRequestsPage implements OnInit {
  requestedCarpools$!: Observable<RequestedCarpool[]>;
  campusId!: number;
  campusPlaceId!: string | null;

  constructor(
    private carpoolService: CarpoolService,
    private authService: AuthenticationService,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.campusPlaceId = this.activatedRoute.snapshot.queryParamMap.get('origem');
    this.campusId = +this.activatedRoute.snapshot.queryParamMap.get('campus')!;

    this.requestedCarpools$ = this.carpoolService.findCarpoolRequestsByCampus(this.campusId);
  }

  trackByItem(idx: number, item: RequestedCarpool) {
    return item.studentId;
  }

  approveCarpoolRequest(studentId: number) {
    const {userId} = this.authService.loggedUser!;

    this.carpoolService
      .approveCarpoolRequest(studentId, userId, this.campusId)
      .subscribe({
        next: _data => {
          this.toastService.showSuccessToast("Carona aceita com sucesso");
          this.router.navigate(['/motorista']);
        },
        error: err => this.toastService.showErrorToastAndLog("Problema ao aceitar a carona", err)
      });
  }
}
