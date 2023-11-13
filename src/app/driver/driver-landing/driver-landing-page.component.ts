import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {RouterLink} from "@angular/router";
import {DriverService} from "../../services/driver.service";
import {LandingPageHeaderComponent} from "../../components/landing-page-header/landing-page-header.component";

@Component({
  selector: 'app-driver-landing-page',
  templateUrl: './driver-landing-page.component.html',
  styleUrls: ['./driver-landing-page.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, LandingPageHeaderComponent],
  providers: [AuthenticationService, DriverService]
})
export class DriverLandingPage implements OnInit {
  username!: string;
  isFindCarpoolEnabled = false;

  findCarpoolNav = {
    description: "Procurar alunos",
    icon: "chevron-forward-outline",
    url: ['../caronas/procurar']
  };
  manageCarpool = {
    description: "Gerenciar Viagem",
    icon: "chevron-forward-outline",
    url: ['../caronas/iniciar']
  };

  navigations = [
    {description: "Editar Perfil", icon: "person-outline", url: ['/motorista/perfil']},
    {description: "Minha Van", icon: "bus-outline", url: ['/motorista/van']},
    {description: "Mensalistas", icon: "people-outline", url: ['/motorista/mensalistas/']},
    {description: "Histórico", icon: "calendar-outline", url: ['/motorista/caronas/historico']},
  ];

  constructor(private authService: AuthenticationService,
              private driverService: DriverService) {
  }

  ngOnInit() {
    const loggedUser = this.authService.loggedUser;
    this.username = loggedUser ? loggedUser.name.split(" ")[0] : 'pessoa';

    this.driverService.findDriverById(loggedUser!.userId).subscribe({
      next: data => {
        if (data.vehicleId !== 0) {
          this.isFindCarpoolEnabled = true;
        }
      },
      error: err => console.error("There was a problem retrieving driver info", err)
    });
  }

}
