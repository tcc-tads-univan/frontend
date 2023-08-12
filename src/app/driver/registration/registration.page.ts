import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class RegistrationPage implements OnInit {
  passwordVisible = false;
  constructor() {
  }

  ngOnInit() {
  }

  handleSubmit() {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

}
