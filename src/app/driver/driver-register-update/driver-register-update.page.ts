import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {Router, RouterLink} from "@angular/router";
import {DriverService} from "../../services/driver.service";
import {DriverRegistration} from "../../shared/models/driver/driver-registration";
import {CpfFormatDirective} from "../../shared/directives/cpf-format.directive";
import {CnhFormatDirective} from "../../shared/directives/cnh-format-directive";
import {PhoneNumberDirective} from "../../shared/directives/phone-number-directive";
import {ToastService} from 'src/app/services/toast.service';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {CpfPipe} from "../../shared/pipes/cpf-pipe";
import {Driver} from "../../shared/models/driver/driver";
import {CnhFormatPipe} from "../../shared/pipes/cnh-format.pipe";
import {PhoneFormatPipe} from "../../shared/pipes/phone-format.pipe";

@Component({
  selector: 'app-driver-registration',
  templateUrl: './driver-register-update.page.html',
  styleUrls: ['./driver-register-update.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, CpfFormatDirective, CnhFormatDirective, PhoneNumberDirective, CpfPipe, PhoneFormatPipe],
  providers: [DriverService, ToastService, AuthenticationService, CpfPipe, CnhFormatPipe, PhoneFormatPipe]
})
export class DriverRegisterUpdatePage implements OnInit {
  isEdit = false;
  driver!: Driver;

  registrationForm = this.fb.group({
    name: ['', [Validators.minLength(5), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phonenumber: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    cnh: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    birthdate: [new Date().toISOString(), [Validators.required]]
  });

  passwordVisible = false;
  private userId!: number;

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private driverService: DriverService,
              private router: Router,
              private toastService: ToastService,
              private cpfFormatPipe: CpfPipe,
              private cnhPipe: CnhFormatPipe,
              private phonePipe: PhoneFormatPipe) {
  }

  ngOnInit() {
    if (this.router.url === '/motorista/perfil') {
      this.setEditPage();
    }
  }

  private setEditPage() {
    this.isEdit = true;

    this.password?.removeValidators(Validators.required);
    this.cpf?.disable({onlySelf: true});
    this.cnh?.disable({onlySelf: true});
    this.birthdate?.disable({onlySelf: true});

    this.userId = this.authService.loggedUser!.userId;

    this.driverService.findDriverById(this.userId).subscribe({
      next: data => {
        this.registrationForm.setValue({
          name: data.name,
          email: data.email,
          cpf: this.cpfFormatPipe.transform(data.cpf),
          cnh: this.cnhPipe.transform(data.cnh),
          birthdate: data.birthday,
          password: '',
          phonenumber: this.phonePipe.transform(data.phoneNumber)
        });
      },
      error: err => {
        this.toastService.showErrorToastAndLog('Problema ao recuperar seus dados', err);
        this.router.navigate(['/']);
      }
    });
  }

  handleSubmit() {
    if (this.registrationForm.valid) {
      const driver: DriverRegistration = {
        name: this.name?.value ?? '',
        cpf: this.cpf?.value ? this.cpf.value.replace(/\D/g, "").slice(0, 11) : '',
        cnh: this.cnh?.value ? this.cnh.value.replace(/\D/g, "").slice(0, 11) : '',
        phonenumber: this.phonenumber?.value ? this.phonenumber.value.replace(/\D/g, "").slice(0, 11) : '',
        email: this.email?.value ?? '',
        password: this.password?.value ?? '',
        birthdate: this.birthdate!.value ?? ''
      }

      if (this.isEdit) {
        this.updateDriver(this.userId, driver);
      } else {
        this.registerDriver(driver);
      }
    }
  }

  registerDriver(driver: DriverRegistration) {
    this.driverService.registerDriver(driver).subscribe({
      next: _ => {
        this.toastService.showSuccessToast('Cadastro feito com sucesso');
        this.router.navigate(['/']);
      },
      error: err => this.toastService.showErrorToastAndLog('Erro ao concluir o seu cadastro', err)
    });
  }

  updateDriver(driverId: number, driver: DriverRegistration) {
    this.driverService.updateDriverById(driverId, driver).subscribe({
      next: _ => {
        this.toastService.showSuccessToast('Dados atualizados com sucesso');
        this.router.navigate(['/motorista']);
      },
      error: err => this.toastService.showErrorToastAndLog('Erro ao atualizar seus dados', err)
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get cpf() {
    return this.registrationForm.get('cpf');
  }

  get cnh() {
    return this.registrationForm.get('cnh');
  }

  get phonenumber() {
    return this.registrationForm.get('phonenumber');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get birthdate() {
    return this.registrationForm.get('birthdate');
  }
}
