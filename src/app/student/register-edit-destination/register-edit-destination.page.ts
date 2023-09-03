import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-register-edit-destination',
  templateUrl: './register-edit-destination.page.html',
  styleUrls: ['./register-edit-destination.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink]
})
export class RegisterEditDestinationPage implements OnInit {
  addressForm = this.fb.group({});

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  handleSubmit() {}

}
