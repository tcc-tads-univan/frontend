import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

interface Card {
  university: string;
  address: string;
}
interface Time {
  hour: string;
}

@Component({
  selector: 'app-solicitar-carona',
  templateUrl: './solicitar-carona.page.html',
  styleUrls: ['./solicitar-carona.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})


export class SolicitarCaronaPage implements OnInit {
  time:Time[] = [
    {
      hour: '09:00'
    },
    {
      hour: '09:30'
    },
    {
      hour: '10:00'
    },
    {
      hour: '10:30'
    },
    {
      hour: '11:00'
    }
  ]


  cards:Card[] = [
    {
      university: 'Universidade Federal do Paraná',
      address: 'Rua João Assef 1010'
    },
    {
      university: 'PUCPR',
      address: 'Rua João Assef 1010'
    }
  ];
  selectedCard: Card | null = null;

  selectCard(card: Card) {
    this.selectedCard = card;
  }

  handleButtonClick() {
    if (this.selectedCard) {
      console.log('Selected Card:', this.selectedCard);
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
