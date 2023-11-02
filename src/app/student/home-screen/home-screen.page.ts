import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ToastController} from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication.service";
import {Router, RouterLink} from "@angular/router";
import {LoginResponse} from "../../shared/models/user/login-response.model";
import {LocalStorageService} from "../../services/local-storage.service";
import {StudentService} from "../../services/student.service";
import {Address} from "../../shared/models/address/address";

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.page.html',
  styleUrls: ['./home-screen.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
  providers: [AuthenticationService, StudentService]
})
export class HomeScreenPage implements OnInit {
  navigationUrls = {
    findCarpools: ['../caronas'],
    editProfile: ['../editar'],
    regularStudents: ['../mensalistas'],
    history: ['../carona/historico'],
    address: ['../endereco']
  }

  loggedUser!: LoginResponse | null;
  addressRegistered = false;
  address: Address | undefined;

  constructor(private authenticationService: AuthenticationService, private router: Router, private localStorageService: LocalStorageService, private studentService: StudentService, private toastController: ToastController) {
    this.loggedUser = this.localStorageService.loggedUser;
  }


  ngOnInit() {
    this.isStudentAddresRegistered();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  deleteStudentAddress(studentId: number) {
    this.studentService.deleteStudentAddress(studentId, 2).subscribe(
      () => {
        this.toastController.create({
          message: 'Deletado com sucesso.',
          duration: 1000,
          position: 'top',
          color: 'success',
          icon: 'checkmark-outline'
        }).then(toast => toast.present());
      },
      (error) => {
          this.toastController.create({
            message: 'Erro ao deletar endereço. Verifique seu status de mensalista.',
            duration: 1500,
            position: 'top',
            color: 'danger',
            icon: 'bug-outline'
          }).then(toast => toast.present());

          console.error(`[${error.status}] ${error.message}`);
      }
    );
  }

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: () => {
        // @ts-ignore
        this.deleteStudentAddress(this.loggedUser?.userId)
      },
    },
  ];


  isStudentAddresRegistered() {
    // @ts-ignore
    this.studentService.findStudentAddress(this.loggedUser?.userId, 2).subscribe({
      next: data => {
        this.address = data;
        this.addressRegistered = true;
        console.log(this.addressRegistered)
      },
      error: (err) => {
        console.error(`[${err.status}] ${err.message}`);
      }
    });
  }

}
