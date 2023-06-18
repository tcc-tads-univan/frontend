import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-validar-carona',
  templateUrl: './validar-carona.page.html',
  styleUrls: ['./validar-carona.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ValidarCaronaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
