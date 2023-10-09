import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-add-regular-student',
  templateUrl: './add-regular-student.page.html',
  styleUrls: ['./add-regular-student.page.scss'],
  standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddRegularStudentPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
