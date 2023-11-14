import {Component, Input, OnInit} from '@angular/core';
import {AlertButton, IonicModule} from "@ionic/angular";
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {StudentService} from "../../../services/student.service";
import {ToastService} from "../../../services/toast.service";
import {Student} from "../../../shared/models/student/student";
import {Address} from "../../../shared/models/address/address";
import {Observable} from "rxjs";

@Component({
  selector: 'app-student-address',
  templateUrl: './student-address.component.html',
  styleUrls: ['./student-address.component.scss'],
  imports: [
    IonicModule,
    NgIf,
    RouterLink,
    AsyncPipe
  ],
  standalone: true,
  providers: [StudentService, ToastService]
})
export class StudentAddressComponent implements OnInit {
  @Input({required: true})
  student!: Student;
  @Input({required: true})
  address$!: Observable<Address>;

  alertButtons: AlertButton[] = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: () => {
        this.deleteStudentAddress();
      },
    },
  ];

  constructor(private studentService: StudentService,
              private toastService: ToastService) {
  }

  ngOnInit() {
  }

  deleteStudentAddress() {
    this.studentService.deleteStudentAddress(this.student.id, this.student.addressId)
      .subscribe({
        next: (_data) => {
          this.toastService.showSuccessToast('Endereço removido com sucesso');
          window.location.reload();
        },
        error: (err) => {
          this.toastService.showErrorToastAndLog('Problema ao remover o endereço. Verifique seu status de mensalista', err);
        }
      });
  }
}
