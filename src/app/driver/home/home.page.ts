import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterLink} from "@angular/router";
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CollegeService} from "../../services/college.service";
import {CollegeCampus} from "../../shared/models/college/college-campus";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, ScrollingModule],
  providers: [CollegeService]
})
export class HomePage implements OnInit {
  _campiList: CollegeCampus[] = [];
  filteredCampiList: CollegeCampus[] = [];
  selectedCampus!: CollegeCampus;

  constructor(private collegeService: CollegeService) {
  }

  ngOnInit() {
    this.collegeService.findAllCampi().subscribe(
      campi => {
        this._campiList = campi;
        this.filteredCampiList = [...this._campiList];
      }
    )
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
