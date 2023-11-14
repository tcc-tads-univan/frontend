import {Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-empty-regular-students',
  templateUrl: './empty-regular-students.component.html',
  styleUrls: ['./empty-regular-students.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterLink
  ]
})
export class EmptyRegularStudentsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
