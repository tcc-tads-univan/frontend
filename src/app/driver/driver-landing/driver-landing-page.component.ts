import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-driver-landing-page',
  templateUrl: './driver-landing-page.component.html',
  styleUrls: ['./driver-landing-page.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
  providers: [AuthenticationService]
})
export class DriverLandingPage implements OnInit {
  username!: string;

  findCarpoolNav = {
    description: "Procurar alunos",
    icon: "chevron-forward-outline",
    url: ['../caronas/procurar']
  };

  navigations = [
    {description: "Editar Perfil", icon: "person-outline", url: ['../editar']},
    {description: "Minha Van", icon: "bus-outline", url: ['../van']},
    {description: "Mensalistas", icon: "people-outline", url: ['../mensalistas/editar']},
    {description: "Histórico", icon: "calendar-outline", url: ['../caronas/historico']},
    {description: "mock", icon: "", url: ['../caronas/detalhe']}
  ];

  constructor(private router: Router, private authService: AuthenticationService) {
  }

  ngOnInit() {
    const loggedUser = this.authService.loggedUser;
    this.username = loggedUser ? loggedUser.name.split(" ")[0] : 'pessoa';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
