import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-register-edit-vehicle',
  templateUrl: './register-edit-vehicle.page.html',
  styleUrls: ['./register-edit-vehicle.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, ReactiveFormsModule]
})
export class RegisterEditVehiclePage implements OnInit {
  driver = {name: 'Adevaldo'}
  currentYear = new Date().getFullYear();
  vehicleForm = this.fb.group({
    licensePlate: ['', [Validators.required]],
    model: ['', [Validators.minLength(3), Validators.required]],
    fabricationYear: ['', [Validators.required, Validators.min(1980), Validators.max(this.currentYear)]],
    seatsNumber: ['', [Validators.required, Validators.min(0), Validators.max(20)]],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  handleSubmit() {
    if (this.vehicleForm.valid) {
      console.log(this.vehicleForm.value);
    }
  }

  public get licensePlate() {
    return this.vehicleForm.get('licensePlate');
  }

  public get model() {
    return this.vehicleForm.get('model');
  }

  public get fabricationYear() {
    return this.vehicleForm.get('fabricationYear');
  }

  public get seatsNumber() {
    return this.vehicleForm.get('seatsNumber');
  }
}
