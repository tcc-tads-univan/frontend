import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterLink} from "@angular/router";
import {ScrollingModule} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, ScrollingModule],
})
export class HomePage implements OnInit {
  selectedCampus!: { campusName: string, completeLineAddress: string };
  _campiList = Array.from({length: 100000}).map((_, i) => _ = {
    campusName: "campus " + i,
    completeLineAddress: "rua pinto " + i
  });
  filteredCampiList = [...this._campiList];

  constructor() {
  }

  ngOnInit() {
  }

  trackByItem(idx: number, item: any) {
    return item.campusName;
  }

  handleInput(event: any) {
    if (this.filteredCampiList) {
      const query = event.target.value.toLowerCase();
      this.filteredCampiList = this._campiList.filter((c) => c.campusName!.toLowerCase().indexOf(query) > -1);
    }
  }
}
