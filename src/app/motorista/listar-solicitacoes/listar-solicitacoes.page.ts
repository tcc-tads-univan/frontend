import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-listar-solicitacoes',
  templateUrl: './listar-solicitacoes.page.html',
  styleUrls: ['./listar-solicitacoes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ListarSolicitacoesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
