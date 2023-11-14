import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {Router, RouterLink} from "@angular/router";
import {VehicleRegistration} from "../../shared/models/vehicle/vehicle-registration";
import {DriverService} from "../../services/driver.service";
import {ToastService} from 'src/app/services/toast.service';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {RoutesService} from "../../services/routes.service";
import {Address} from "../../shared/models/address/address";
import {RegisterAddressComponent} from "../../components/shared/register-address/register-address.component";

@Component({
  selector: 'app-register-edit-vehicle',
  templateUrl: './register-edit-vehicle.page.html',
  styleUrls: ['./register-edit-vehicle.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, ReactiveFormsModule, RegisterAddressComponent],
  providers: [DriverService, ToastService, AuthenticationService, RoutesService]
})
export class RegisterEditVehiclePage implements OnInit {
  private readonly driverHomeUrl = ['/motorista'];
  private userId!: number;
  private vehicleId!: number;

  currentYear = new Date().getFullYear();
  isRegistered = false;

  vehicleForm = this.fb.group({
    plate: ['', [Validators.required]],
    model: ['', [Validators.minLength(3), Validators.required]],
    fabricationYear: ['', [Validators.required, Validators.min(1980), Validators.max(this.currentYear + 1)]],
    seats: ['', [Validators.required, Validators.min(0), Validators.max(20)]],
    garageAddress: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private driverService: DriverService,
              private toastService: ToastService,
              private router: Router,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.userId = this.authService.loggedUser!.userId;

    this.driverService.findDriverById(this.userId).subscribe(driver => {
      const {vehicleId} = driver;
      this.setVehicleInformation(vehicleId);
    });
  }

  handleSubmit() {
    if (this.vehicleForm.valid) {
      const vehicle: VehicleRegistration = {
        plate: this.licensePlate?.value ?? '',
        model: this.model?.value ?? '',
        fabricationYear: parseInt(this.fabricationYear?.value ?? '', 10),
        seats: parseInt(this.seatsNumber?.value ?? '', 10),
        garageAddress: this.vehicleForm.get('garageAddress')!.value ?? ''
      }

      this.registerVehicle(vehicle, this.userId);
    }
  }

  handleAddressSelection(address: Address | null) {
    console.log(address);
    if (address) {
      this.vehicleForm.get('garageAddress')?.setValue(address.placeId);
    }
  }

  private registerVehicle(vehicle: VehicleRegistration, driverId: number) {
    this.driverService.registerVehicle(vehicle, driverId).subscribe({
      next: _ => {
        this.toastService.showSuccessToast('Cadastro concluído');
        this.router.navigate(this.driverHomeUrl);
      },
      error: err => {
        this.toastService.showErrorToastAndLog('Erro ao concluir o cadastro da Van', err);
      }
    });
  }

  deleteVehicle() {
    this.driverService.deleteDriverVehicle(this.userId, this.vehicleId).subscribe({
      next: (_data) => {
        this.toastService.showSuccessToast('Veículo removido com sucesso');
        this.router.navigate(this.driverHomeUrl);
      },
      error: (err) => {
        this.toastService.showErrorToastAndLog('Problema ao remover o veículo cadastrado', err);
      }
    });
  }

  private setVehicleInformation(vehicleId: number) {
    this.vehicleId = vehicleId;

    this.driverService.findVehicleById(this.userId, vehicleId).subscribe({
      next: data => {
        this.isRegistered = true;

        this.vehicleForm.setValue({
          plate: data.plate,
          model: data.model,
          fabricationYear: data.fabricationYear.toString(),
          seats: data.seats.toString(),
          garageAddress: data.garageAddress
        });

        this.licensePlate?.disable({onlySelf: true});
        this.model?.disable({onlySelf: true});
        this.fabricationYear?.disable({onlySelf: true});
        this.seatsNumber?.disable({onlySelf: true});
      },
      error: (err) => {
        if (err.status === 404) {
          this.isRegistered = false;
        } else {
          this.toastService.showErrorToastAndLog('Problema ao recuperar os dados de veículo', err);
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
