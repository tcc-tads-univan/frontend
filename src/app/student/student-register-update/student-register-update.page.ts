import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {StudentRegistration} from "../../shared/models/student/student-registration";
import {Router, RouterLink} from "@angular/router";
import {StudentService} from "../../services/student.service";
import {HttpClientModule} from "@angular/common/http";
import {LoginResponse} from "../../shared/models/user/login-response.model";
import {CpfFormatDirective} from "../../shared/directives/cpf-format.directive";
import {PhoneNumberDirective} from "../../shared/directives/phone-number-directive";
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {ToastService} from "../../services/toast.service";
import {RefreshService} from "../../services/refresh.service";
import {CpfPipe} from "../../shared/pipes/cpf-pipe";
import {PhoneFormatPipe} from "../../shared/pipes/phone-format.pipe";

@Component({
  selector: 'app-student-register-update',
  templateUrl: './student-register-update.page.html',
  styleUrls: ['./student-register-update.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, HttpClientModule, CpfFormatDirective, PhoneNumberDirective, CpfPipe, PhoneFormatPipe],
  providers: [StudentService, AuthenticationService, RefreshService, CpfPipe, PhoneFormatPipe]
})
export class StudentRegisterUpdatePage implements OnInit {
  isEdit = false;

  registrationForm = this.fb.group({
    name: ['', [Validators.minLength(5), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    phonenumber: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    birthdate: [new Date().toISOString(), [Validators.required]]
  });

  passwordVisible = false;
  private loggedUser!: LoginResponse | null;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private toastService: ToastService,
    private authService: AuthenticationService,
    private refreshService: RefreshService,
    private cpfFormatPipe: CpfPipe,
    private phonePipe: PhoneFormatPipe) {
  }

  ngOnInit() {
    if (this.router.url === '/aluno/perfil') {
      this.isEdit = true;

      this.password?.removeValidators(Validators.required);
      this.cpf?.disable({onlySelf: true});
      this.birthdate?.disable({onlySelf: true});

      this.loggedUser = this.authService.loggedUser!;
    }
  }

  ionViewWillEnter() {
    if (this.isEdit) {
      this.studentService.findStudentById(this.loggedUser!.userId).subscribe({
        next: data => {
          this.registrationForm.setValue({
            name: data.name,
            email: data.email,
            cpf: this.cpfFormatPipe.transform(data.cpf),
            birthdate: data.birthday,
            password: "",
            phonenumber: this.phonePipe.transform(data.phoneNumber)
          });
        },
        error: err => {
          console.warn("Problem trying to retireve Student info");
          console.warn(err);
          this.router.navigate(['/']);
        }
      });
    }
  }

  handleSubmit() {
    if (this.registrationForm.valid) {
      const student: StudentRegistration = {
        name: this.name?.value ?? '',
        cpf: this.cpf?.value ? this.cpf.value!.replace(/\D/g, "").slice(0, 11) : '',
        phonenumber: this.phonenumber?.value ? this.phonenumber.value!.replace(/\D/g, "").slice(0, 11) : '',
        email: this.email?.value ?? '',
        password: this.password?.value ?? '',
        birthdate: this.birthdate?.value ?? ''
      }

      if (this.isEdit) {
        this.updateStudent(this.loggedUser!.userId, student);
      } else {
        this.registerStudent(student);
      }
    }
  }

  registerStudent(student: StudentRegistration) {
    this.studentService.registerStudent(student).subscribe({
      next: _ => {
        this.toastService.showSuccessToast('Cadastro realizado com sucesso');
        this.router.navigate(['/']);
      },
      error: err => {
        this.toastService.showErrorToastAndLog('Ocorreu um problema ao tentar finalizar seu cadastro', err);
      }
    });
  }

  updateStudent(studentId: number, student: StudentRegistration) {
    this.studentService.updateStudentById(studentId, student).subscribe({
      next: _data => {
        // Atualiza o nome do usuário no localStorage caso tenha sido alterado
        this.loggedUser!.name = student.name;
        this.authService.saveAuthenticationInfo(this.loggedUser!);

        this.toastService.showSuccessToast('Informações atualizadas com sucesso');

        this.router.navigate(['/aluno']);
      },
      error: err => {
        this.toastService.showErrorToastAndLog('Houve um problema ao atualizar suas informações', err);
      }
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onRefresh() {
    this.refreshService.handleRefresh();
  }

  get name() {
    return this.registrationForm.get('name');
  }

  get cpf() {
    return this.registrationForm.get('cpf');
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
