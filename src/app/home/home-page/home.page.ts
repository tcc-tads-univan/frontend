import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterLink} from "@angular/router";
import {UnivanLogoComponent} from "../../components/shared/univan-logo/univan-logo.component";

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, UnivanLogoComponent]
})
export class HomePage implements OnInit {
  authenticationRoute = ['/entrar'];

  profileQueryParams = {
    driver: {p: 'motorista'},
    student: {p: 'aluno'}
  };

  constructor() {
  }

  ngOnInit() {
  }

}
