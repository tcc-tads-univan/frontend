import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {Router, RouterLink} from "@angular/router";
import {VehicleRegistration} from "../../shared/models/vehicle/vehicle-registration";
import {DriverService} from "../../services/driver.service";
import {ToastService} from 'src/app/services/toast.service';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {HttpStatusCode} from "@angular/common/http";
import {RoutesService} from "../../services/routes.service";
import {Address} from "../../shared/models/address/address";

@Component({
  selector: 'app-register-edit-vehicle',
  templateUrl: './register-edit-vehicle.page.html',
  styleUrls: ['./register-edit-vehicle.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  providers: [DriverService, ToastService, AuthenticationService, RoutesService]
})
export class RegisterEditVehiclePage implements OnInit {
  private userId!: number;
  private vehicleId!: number;
  isRegistered!: boolean;

  currentYear = new Date().getFullYear();

  addressForm = this.fb.group({
    streetname: ['', [Validators.required, Validators.minLength(3)]],
    number: [0, [Validators.required, Validators.min(0)]],
    neighborhood: ['', [Validators.required]],
    city: ['', [Validators.required, Validators.minLength(3)]],
    state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]]
  });

  vehicleForm = this.fb.group({
    plate: ['', [Validators.required]],
    model: ['', [Validators.minLength(3), Validators.required]],
    fabricationYear: ['', [Validators.required, Validators.min(1980), Validators.max(this.currentYear)]],
    seats: ['', [Validators.required, Validators.min(0), Validators.max(20)]],
    garageAddress: ['', Validators.required]
  });

  showResultList = false;
  addressList!: Array<Address>;
  selectedAddress: Address | undefined;

  constructor(private fb: FormBuilder,
              private driverService: DriverService,
              private toastService: ToastService,
              private router: Router,
              private authService: AuthenticationService,
              private routesService: RoutesService) {
  }

  ngOnInit() {
    this.userId = this.authService.loggedUser!.userId;

    this.driverService.findDriverById(this.userId).subscribe(propertyValue => {
      const {vehicleId} = propertyValue;
      this.isVehicleRegistered(vehicleId);
    });
  }

  handleSubmit() {
    if (this.vehicleForm.valid && this.selectedAddress) {
      const vehicle: VehicleRegistration = {
        plate: this.licensePlate?.value ?? '',
        model: this.model?.value ?? '',
        fabricationYear: parseInt(this.fabricationYear?.value ?? '', 10),
        seats: parseInt(this.seatsNumber?.value ?? '', 10),
        garageAddress: this.selectedAddress!.placeId
      }

      this.registerVehicle(vehicle, this.userId);
    }
  }

  buildAddress(): string {
    let strBuilder = `${this.streetname?.value}, ${this.number?.value}`;
    strBuilder += ` - ${this.neighborhood?.value}, ${this.city?.value} - ${this.state?.value}`;
    return strBuilder;
  }

  handleAddressSubmit() {
    this.selectedAddress = undefined;

    if (this.addressForm.valid) {
      this.routesService
        .autocompleteAddress(this.buildAddress())
        .subscribe({
          next: data => {
            this.addressList = data;
            this.showResultList = true;
          },
          error: err => {
            this.showResultList = false;

            if (err.error.status === HttpStatusCode.NotFound) {
              this.toastService.showWarningToast('Endereço não encontrado', 'alert-outline');
            } else {
              this.toastService.showErrorToastAndLog('Problema ao buscar o endereço', err);
            }
          }
        });
    }
  }


  private readonly driverHomeUrl = ['/motorista'];

  registerVehicle(vehicle: VehicleRegistration, driverId: number) {
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

  isVehicleRegistered(vehicleId: number) {
    this.vehicleId = vehicleId;

    this.driverService.findVehicleById(this.userId, vehicleId).subscribe({
      next: data => {
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

        this.isRegistered = true;
      },
      error: (err) => {
        if (err.status === 404) {
          this.isRegistered = false;
        } else {
          this.toastService.showErrorToastAndLog('Problema ao recuperar os dados do veículo', err);
        }
      }
    });
  }

  trackByItem(_idx: number, item: Address) {
    return item.completeLineAddress;
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


  get streetname() {
    return this.addressForm.get('streetname');
  }

  get number() {
    return this.addressForm.get('number');
  }

  get neighborhood() {
    return this.addressForm.get('neighborhood');
  }

  get city() {
    return this.addressForm.get('city');
  }

  get state() {
    return this.addressForm.get('state');
  }
}
