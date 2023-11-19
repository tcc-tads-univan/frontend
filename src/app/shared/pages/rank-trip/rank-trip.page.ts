import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {Rating} from "../../models/rating/rating";
import {DriverService} from "../../../services/driver.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../../services/toast.service";
import {UserType} from "../../enums/user-type";
import {StudentService} from "../../../services/student.service";

@Component({
  selector: 'app-rank-trip',
  templateUrl: './rank-trip.page.html',
  styleUrls: ['./rank-trip.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [DriverService, StudentService]
})
export class RankTripPage implements OnInit {
  userId!: number;
  userType!: UserType
  rankForm = this.fb.group({
    tripStars: [1, [Validators.required]],
  });

  readonly tripStars = [
    {value: 1, text: "1"},
    {value: 2, text: "2"},
    {value: 3, text: "3"},
    {value: 4, text: "4"},
    {value: 5, text: "5"},
  ]

  constructor(private fb: FormBuilder, private driverService: DriverService, private route: ActivatedRoute, private toastService: ToastService, private router: Router, private studentService: StudentService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userType = params['userType']
      this.userId = params['userId'];
    })
  }

  ratingDriver() {
    if (this.rankForm.valid) {
      const rating: Rating = {
        rating: this.rating!.value ?? 1,
      }

      this.driverService.rankDriver(this.userId, rating).subscribe(
        next => {
          this.toastService.showSuccessToast("Carona finalizada com sucesso!");
          this.router.navigate(['/aluno']);
        },
        error => {
          this.toastService.showErrorToastAndLog("Houve algum erro ao avaliar o motorista", error);
        }
      )
    }
  }

  ratingStudent() {
    if (this.rankForm.valid) {
      const rating: Rating = {
        rating: this.rating!.value ?? 1,
      }

      this.studentService.rankStudent(this.userId, rating).subscribe(
        next => {
          this.toastService.showSuccessToast("Carona finalizada com sucesso!");
          this.router.navigate(['/motorista']);
        },
        error => {
          this.toastService.showErrorToastAndLog("Houve algum erro ao avaliar o aluno", error);
        }
      )
    }
  }

  public get rating() {
    return this.rankForm.get('tripStars');
  }

  protected readonly UserType = UserType;
}
