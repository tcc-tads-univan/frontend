import {Component, Input, OnInit} from '@angular/core';
import {Student} from "../../shared/models/student/student";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-regular-student-info',
  templateUrl: './regular-student-info.component.html',
  styleUrls: ['./regular-student-info.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class RegularStudentInfoComponent  implements OnInit {
  @Input({required: true})
  student!: Student;

  constructor() { }

  ngOnInit() {}

}
