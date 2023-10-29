import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, ToastController} from '@ionic/angular';
import {Router, RouterLink} from "@angular/router";
import {VehicleRegistration} from "../../shared/models/vehicle/vehicle-registration";
import {DriverService} from "../../services/driver.service";
import {LoginResponse} from "../../shared/models/user/login-response.model";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-register-edit-vehicle',
  templateUrl: './register-edit-vehicle.page.html',
  styleUrls: ['./register-edit-vehicle.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  providers: [DriverService]
})
export class RegisterEditVehiclePage implements OnInit {
  driver = {name: this.localStorageService.loggedUser?.name}
  isRegistered!: boolean;
  vehicleId: number = 0;

  currentYear = new Date().getFullYear();
  vehicleForm = this.fb.group({
    plate: ['', [Validators.required]],
    model: ['', [Validators.minLength(3), Validators.required]],
    fabricationYear: ['', [Validators.required, Validators.min(1980), Validators.max(this.currentYear)]],
    seats: ['', [Validators.required, Validators.min(0), Validators.max(20)]],
  });

  private loggedUser!: LoginResponse | null;
  driverId = 0;

  constructor(private fb: FormBuilder,
              private driverService: DriverService,
              private toastController: ToastController,
              private router: Router,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.loggedUser = this.localStorageService.loggedUser;
    if (!this.loggedUser) {
      throw new Error("User is not logged in");
    }

    this.driverService.findDriverById(this.loggedUser.userId).subscribe(propertyValue => {
      this.vehicleId = propertyValue.vehicleId;
      this.isVehicleRegistered(this.vehicleId);
    });
  }

  handleSubmit() {
    if (this.vehicleForm.valid) {
      const vehicle: VehicleRegistration = {
        plate: this.licensePlate?.value ?? '',
        model: this.model?.value ?? '',
        fabricationYear: parseInt(this.fabricationYear?.value ?? '', 10),
        seats: parseInt(this.seatsNumber?.value ?? '', 10),
      }

      this.registerVehicle(vehicle, this.loggedUser!.userId);
      console.log(vehicle);
    }
  }

  private readonly driverHomeUrl = ['/motorista'];

  registerVehicle(vehicle: VehicleRegistration, driverId: number) {
    this.driverService.createVehicle(vehicle, driverId).subscribe({
      next: _ => {
        this.toastController.create({
          message: 'Cadastro concluído!',
          duration: 1000,
          position: 'top',
          color: 'success',
          icon: 'checkmark-outline'
        }).then(toast => toast.present());

        this.router.navigate(this.driverHomeUrl);
      },
      error: err => {
        this.toastController.create({
          message: 'Erro ao concluir o cadastro da Van',
          duration: 1500,
          position: 'top',
          color: 'danger',
          icon: 'bug-outline'
        }).then(toast => toast.present());

        console.error(`[${err.status}] ${err.message}`);
      }
    });
  }

  deleteVehicle() {
    this.driverService.deleteDriverVehicle(this.driverId, this.vehicleId).subscribe(
      () => {
        this.toastController.create({
          message: 'Veículo removido!',
          duration: 1000,
          position: 'top',
          color: 'success',
          icon: 'checkmark-outline'
        }).then(toast => toast.present());

        this.router.navigate(this.driverHomeUrl);
      },
      (err) => {
        this.toastController.create({
          message: 'Problema ao remover o veículo cadastrado.',
          duration: 1500,
          position: 'top',
          color: 'danger',
          icon: 'bug-outline'
        }).then(toast => toast.present());

        console.error(`[${err.status}] ${err.message}`);
      }
    );
  }

  isVehicleRegistered(vehicleId: number) {
    this.driverService.findVehicleById(this.loggedUser!.userId, vehicleId).subscribe({
      next: data => {
        this.vehicleForm.setValue({
          plate: data.plate,
          model: data.model,
          fabricationYear: data.fabricationYear.toString(),
          seats: data.seats.toString()
        });

        this.driverId = this.loggedUser!.userId;
        this.licensePlate?.disable({onlySelf: true});
        this.model?.disable({onlySelf: true});
        this.fabricationYear?.disable({onlySelf: true});
        this.seatsNumber?.disable({onlySelf: true});

        this.isRegistered = true;
      },
      error: (err) => {
        if (err.status === 404) {
          this.isRegistered = false;
        } else {
          console.error(`[${err.status}] ${err.message}`);
        }
      }
    });
  }

  public get licensePlate() {
    return this.vehicleForm.get('plate');
  }

  public get model() {
    return this.vehicleForm.get('model');
  }

  public get fabricationYear() {
    return this.vehicleForm.get('fabricationYear');
  }

  public get seatsNumber() {
    return this.vehicleForm.get('seats');
  }
}
