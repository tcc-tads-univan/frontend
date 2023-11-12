import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {Router, RouterLink} from "@angular/router";
import {RoutesService} from "../../services/routes.service";
import {Address} from "../../shared/models/address/address";
import {HttpStatusCode} from "@angular/common/http";
import {StudentService} from "../../services/student.service";
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-register-edit-destination',
  templateUrl: './register-edit-destination.page.html',
  styleUrls: ['./register-edit-destination.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  providers: [RoutesService, StudentService, AuthenticationService]
})
export class RegisterEditDestinationPage implements OnInit {
  addressForm = this.fb.group({
    streetname: ['', [Validators.required, Validators.minLength(3)]],
    number: [0, [Validators.required, Validators.min(0)]],
    neighborhood: ['', [Validators.required]],
    city: ['', [Validators.required, Validators.minLength(3)]],
    state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]]
  });

  showResultList = false;
  addressList!: Array<Address>;
  selectedAddress: Address | undefined;

  constructor(private fb: FormBuilder,
              private toastService: ToastService,
              private authService: AuthenticationService,
              private router: Router,
              private routesService: RoutesService,
              private studentService: StudentService) {
  }

  ngOnInit() {
  }

  trackByItem(_idx: number, item: Address) {
    return item.completeLineAddress;
  }

  buildAddress(): string {
    let strBuilder = `${this.streetname?.value}, ${this.number?.value}`;
    strBuilder += ` - ${this.neighborhood?.value}, ${this.city?.value} - ${this.state?.value}`;
    return strBuilder;
  }

  handleSubmit() {
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

  saveAddress() {
    if (this.selectedAddress && this.authService.loggedUser) {
      this.studentService
        .registerStudentAddress(this.authService.loggedUser.userId, this.selectedAddress)
        .subscribe({
          next: _data => {
            this.toastService.showSuccessToast('Endereço cadastrado com sucesso');
            this.router.navigate(['/aluno']);
          },
          error: err => this.toastService.showErrorToastAndLog('Problema ao salvar o endereço', err),
        });
    }
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
