import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RoutesService} from "../../../services/routes.service";
import {Address} from "../../../shared/models/address/address";
import {ToastService} from "../../../services/toast.service";

@Component({
  selector: 'app-register-address',
  templateUrl: './register-address.component.html',
  styleUrls: ['./register-address.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  providers: [RoutesService]
})
export class RegisterAddressComponent implements OnInit {
  @Output() addressOutput = new EventEmitter<Address | null>();

  addressForm = this.formBuilder.group({
    streetname: ['', [Validators.required, Validators.minLength(3)]],
    number: [0, [Validators.required, Validators.min(0)]],
    neighborhood: ['', [Validators.required]],
    city: ['', [Validators.required, Validators.minLength(3)]],
    state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    selectedAddress: [null],
  });

  results!: Address[];

  constructor(private formBuilder: FormBuilder,
              private toastService: ToastService,
              private routesService: RoutesService) {
  }

  ngOnInit() {
  }

  handleAutocompleteAddress() {
    if (this.addressForm.valid) {
      this.routesService.autocompleteAddress(this.buildSearcheableLineAddress())
        .subscribe({
          next: res => {
            this.results = res;
          },
          error: err => {
            this.toastService.showErrorToastAndLog("Não foi possível encontrar seu endereço", err);
          }
        })
    }
  }

  selectAddress() {
    if (this.selectedAddress && this.selectedAddress.value) {
      this.addressOutput.emit(this.selectedAddress.value);
    } else {
      this.addressForm.get('selectedAddress')?.setValue(null);
    }
  }

  private buildSearcheableLineAddress(): string {
    return `${this.streetname?.value}, ${this.number?.value} - ${this.neighborhood?.value}, ${this.city?.value} - ${this.state?.value}`;
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

  get selectedAddress() {
    return this.addressForm.get('selectedAddress');
  }

}
