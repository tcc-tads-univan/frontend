import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-carona-solicitada',
  templateUrl: './carona-solicitada.page.html',
  styleUrls: ['./carona-solicitada.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CaronaSolicitadaPage implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
