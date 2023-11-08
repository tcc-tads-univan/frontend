import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication.service";
import {Router, RouterLink} from "@angular/router";
import {StudentService} from "../../services/student.service";
import {Address} from "../../shared/models/address/address";
import {ToastService} from 'src/app/services/toast.service';

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
    findCarpools: ['../carona'],
    editProfile: ['../editar'],
    regularStudents: ['../mensalista'],
    history: ['../carona/historico'],
    address: ['../endereco']
  }

  userId!: number;
  addressRegistered = false;
  address: Address | undefined;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private studentService: StudentService,
    private toastService: ToastService
  ) {
    this.userId = this.authService.loggedUser!.userId;
  }


  ngOnInit() {
    this.isStudentAddressRegistered();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  deleteStudentAddress(studentId: number) {
    this.studentService.deleteStudentAddress(studentId, 2).subscribe({
      next: (_data) => {
        this.toastService.showSuccessToast('Endereço removido com sucesso');
      },
      error: (err) => {
        this.toastService.showErrorToastAndLog('Erro ao remover o endereço. Verifique seu status de mensalista', err);
      }
    });
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
        this.deleteStudentAddress(this.userId)
      },
    },
  ];


  isStudentAddressRegistered() {
    this.studentService.findStudentAddress(this.userId, 2).subscribe({
      next: data => {
        this.address = data;
        this.addressRegistered = true;
      },
      error: (err) => {
        console.error(`[${err.status}] ${err.message}`);
      }
    });
  }

}
