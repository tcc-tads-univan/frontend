import {Component, Input, OnInit} from '@angular/core';
import {Student} from "../../../../shared/models/student/student";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-not-regular-student-card',
  templateUrl: './not-regular-student-card.component.html',
  styleUrls: ['./not-regular-student-card.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class NotRegularStudentCardComponent implements OnInit {
  @Input({required: true})
  student!: Student;

  constructor() {
  }

  ngOnInit() {
  }

}
