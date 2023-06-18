import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-carona-confirmada',
  templateUrl: './carona-confirmada.page.html',
  styleUrls: ['./carona-confirmada.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CaronaConfirmadaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
