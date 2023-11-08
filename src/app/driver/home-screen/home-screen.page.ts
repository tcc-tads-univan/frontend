import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication.service";
import {Router, RouterLink} from "@angular/router";

interface Navigation {
  description: string;
  url: string[];
  icon: string;
}

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.page.html',
  styleUrls: ['./home-screen.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
  providers: [AuthenticationService]
})
export class HomeScreenPage implements OnInit {
  username!: string;

  findCarpoolNav: Navigation = {
    description: "Procurar alunos",
    icon: "chevron-forward-outline",
    url: ['../caronas/procurar']
  };

  navigations: Navigation[] = [
    {description: "Editar Perfil", icon: "person-outline", url: ['../editar']},
    {description: "Minha Van", icon: "bus-outline", url: ['../van']},
    {description: "Mensalistas", icon: "people-outline", url: ['../mensalistas/editar']},
    {description: "Histórico", icon: "calendar-outline", url: ['../caronas/historico']}
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
