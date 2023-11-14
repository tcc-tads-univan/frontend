import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {Router, RouterLink} from "@angular/router";
import {Address} from "../../shared/models/address/address";
import {RegisterAddressComponent} from "../../components/shared/register-address/register-address.component";
import {StudentService} from "../../services/student.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-register-edit-destination',
  templateUrl: './register-edit-destination.page.html',
  styleUrls: ['./register-edit-destination.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RegisterAddressComponent],
  providers: [AuthenticationService, StudentService, ToastService]
})
export class RegisterEditDestinationPage implements OnInit {
  selectedAddress!: Address;

  constructor(private studentService: StudentService,
              private authService: AuthenticationService,
              private router: Router,
              private toastService: ToastService) {
  }

  ngOnInit() {
  }

  handleSelectedAddress(address: Address | null) {
    if (address) {
      this.selectedAddress = address;
    }
  }

  handleSubmit() {
    const {userId} = this.authService.loggedUser!;

    if (this.selectedAddress) {
      this.studentService.registerStudentAddress(userId, this.selectedAddress)
        .subscribe({
          next: _data => {
            this.toastService.showSuccessToast('Endereço cadastrado com sucesso');
            this.router.navigate(['/aluno']);
          },
          error: err => this.toastService.showErrorToastAndLog('Problema ao salvar o endereço', err),
        });
    }
  }
}
