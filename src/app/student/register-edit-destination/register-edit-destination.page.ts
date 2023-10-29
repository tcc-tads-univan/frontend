import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, ToastController} from '@ionic/angular';
import {Router, RouterLink} from "@angular/router";
import {RoutesService} from "../../services/routes.service";
import {Address} from "../../shared/models/address/address";
import {HttpStatusCode} from "@angular/common/http";
import {LocalStorageService} from "../../services/local-storage.service";
import {StudentService} from "../../services/student.service";

@Component({
  selector: 'app-register-edit-destination',
  templateUrl: './register-edit-destination.page.html',
  styleUrls: ['./register-edit-destination.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  providers: [RoutesService]
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
              private toastController: ToastController,
              private localStorageService: LocalStorageService,
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
            this.toastController.create({
              message: (err.error.status === HttpStatusCode.NotFound)
                ? 'Endereço não encontrado'
                : 'Problema ao buscar o endereço',
              duration: 1500,
              position: 'top',
              color: (err.error.status === HttpStatusCode.NotFound) ? 'warning' : 'danger',
              icon: (err.error.status === HttpStatusCode.NotFound) ? 'alert-outline' : 'bug-outline'
            }).then(toast => toast.present());

            console.error(`[${err.error.status}] ${err.error.description}`);
            this.showResultList = false;
          }
        });
    }
  }

  saveAddress() {
    if (this.selectedAddress && this.localStorageService.loggedUser) {
      this.routesService
        .saveStudentAddress(this.localStorageService.loggedUser.userId, this.selectedAddress)
        .subscribe({
          next: _data => {
            this.toastController.create({
              message: 'Endereço cadastrado com sucesso!',
              duration: 1000,
              position: 'top',
              color: 'success',
              icon: 'checkmark-outline'
            }).then(toast => toast.present());
            console.log(this.localStorageService.loggedUser!.userId);

            this.router.navigate(['/aluno']);
          },
          error: err => console.error(err),
        });
    }
  }

  registerStudentAddress(studentId: number) {
    this.studentService.registerStudentAddress(studentId).subscribe({
      next: _data => {
        console.log("Cadastrado")
      },
      error: err => console.error(err)
    })
  } // Estou deixando os métodos aqui pois não entendi o fluxo direito. Depois que conversar com o Gabriel continuo.

  getStudentAddress(studentId: number, addressId: number) {
    this.studentService.findStudentAddress(studentId, addressId);
  } // Estou deixando os métodos aqui pois não entendi o fluxo direito. Depois que conversar com o Gabriel continuo.

  deleteStudentAddress(studentId: number, addressId: number) {
    this.studentService.deleteStudentAddress(studentId, addressId);
  } // Estou deixando os métodos aqui pois não entendi o fluxo direito. Depois que conversar com o Gabriel continuo.

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
