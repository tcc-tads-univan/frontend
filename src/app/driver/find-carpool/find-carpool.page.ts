import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterLink} from "@angular/router";
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CollegeService} from "../../services/college.service";
import {CollegeCampus} from "../../shared/models/college/college-campus";
import {DriverService} from "../../services/driver.service";

@Component({
  selector: 'find-carpool',
  templateUrl: './find-carpool.page.html',
  styleUrls: ['./find-carpool.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, ScrollingModule],
  providers: [CollegeService]
})
export class FindCarpoolPage implements OnInit {
  private campiList: CollegeCampus[] = [];
  filteredCampiList: CollegeCampus[] = [];
  selectedCampus!: CollegeCampus;

  constructor(private collegeService: CollegeService) {
  }

  ngOnInit() {
    this.collegeService.findAllCampi().subscribe(
      campi => {
        this.campiList = campi;
        this.filteredCampiList = [...this.campiList];
      }
    )
  }

  trackByItem(idx: number, item: any) {
    return item.campusName;
  }

  handleInput(event: any) {
    if (this.filteredCampiList) {
      const query = event.target.value.toLowerCase();
      this.filteredCampiList = this.campiList.filter((c) => c.campusName!.toLowerCase().indexOf(query) > -1);
    }
  }
}
