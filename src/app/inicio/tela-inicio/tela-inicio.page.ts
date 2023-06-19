import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-tela-inicio',
  templateUrl: './tela-inicio.page.html',
  styleUrls: ['./tela-inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class TelaInicioPage implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}