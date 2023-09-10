import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register-edit-regular-student',
  templateUrl: './register-edit-regular-student.page.html',
  styleUrls: ['./register-edit-regular-student.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterEditRegularStudentPage implements OnInit {
  studentAvailable: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  public alertButtons = [
    {
      text: 'Não',
      role: 'cancel'
    },
    {
      text: 'Sim',
      role: 'confirm',
      handler: () => {
        console.log('Aluno excluído');
      },
    },
  ];

}
