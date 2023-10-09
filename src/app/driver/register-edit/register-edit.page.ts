import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, ToastController} from '@ionic/angular';
import {Router, RouterLink} from "@angular/router";
import {DriverService} from "../../services/driver.service";
import {DriverRegistration} from "../../shared/models/driver/driver-registration";
import {LocalStorageService} from "../../services/local-storage.service";
import {Driver} from "../../shared/models/driver/driver";
import {LoginResponse} from "../../shared/models/user/login-response.model";

@Component({
  selector: 'app-driver-registration',
  templateUrl: './register-edit.page.html',
  styleUrls: ['./register-edit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  providers: [DriverService]
})
export class RegisterEditPage implements OnInit {
  isEdit = false;

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
  private loggedUser!: LoginResponse | null;

  constructor(private fb: FormBuilder,
              private localStorageService: LocalStorageService,
              private driverService: DriverService,
              private router: Router,
              private toastController: ToastController) {
  }

  ngOnInit() {
    if (this.router.url === '/motorista/editar') {
      this.isEdit = true;

      this.password?.removeValidators(Validators.required);
      this.cpf?.disable({onlySelf: true});
      this.cnh?.disable({onlySelf: true});
      this.birthdate?.disable({onlySelf: true});

      this.loggedUser = this.localStorageService.loggedUser;
      if (!this.loggedUser) {
        throw new Error("User is not logged in");
      }

      this.driverService.findDriverById(this.loggedUser.userId).subscribe({
        next: data => {
          this.registrationForm.setValue({
            name: data.name,
            email: data.email,
            cpf: data.cpf,
            cnh: data.cnh,
            birthdate: data.birthday,
            password: "",
            phonenumber: data.phoneNumber
          });
        },
        error: err => {
          console.error("Problem trying to retireve Driver info");
          this.router.navigate(['/']);
        }
      });
    }
  }

  handleSubmit() {
    if (this.registrationForm.valid) {
      const driver: DriverRegistration = {
        name: this.name?.value ?? '',
        cpf: this.cpf?.value ?? '',
        cnh: this.cnh?.value ?? '',
        phonenumber: this.phonenumber?.value ?? '',
        email: this.email?.value ?? '',
        password: this.password?.value ?? '',
        birthdate: this.birthdate?.value ?? ''
      }

      if (this.isEdit) {
        this.updateDriver(this.loggedUser!.userId, driver);
      } else {
        this.registerDriver(driver);
      }
    }
  }

  registerDriver(driver: DriverRegistration) {
    this.driverService.registerDriver(driver).subscribe({
      next: _ => {
        this.toastController.create({
          message: 'Cadastro concluído!',
          duration: 1000,
          position: 'top',
          color: 'success',
          icon: 'checkmark-outline'
        }).then(toast => toast.present());

        this.router.navigate(['/']);
      },
      error: err => {
        this.toastController.create({
          message: 'Erro ao concluir o seu cadastro',
          duration: 1500,
          position: 'top',
          color: 'danger',
          icon: 'bug-outline'
        }).then(toast => toast.present());

        console.error(`[${err.status}] ${err.message}`);
      }
    });
  }

  updateDriver(driverId: number, driver: DriverRegistration) {
    this.driverService.updateDriverById(driverId, driver).subscribe({
      next: _ => {
        this.toastController.create({
          message: 'Dados atualizados com sucesso',
          duration: 1000,
          position: 'top',
          color: 'success',
          icon: 'checkmark-outline'
        }).then(toast => toast.present());

        this.router.navigate(['/']);
      },
      error: err => {
        this.toastController.create({
          message: 'Erro ao atualizar seus dados',
          duration: 1500,
          position: 'top',
          color: 'danger',
          icon: 'bug-outline'
        }).then(toast => toast.present());

        console.error(`[${err.status}] ${err.message}`);
      }
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
