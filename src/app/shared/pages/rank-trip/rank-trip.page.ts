import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {Rating} from "../../models/rating/rating";
import {DriverService} from "../../../services/driver.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../../services/toast.service";
import {UserType} from "../../enums/user-type";
import {StudentService} from "../../../services/student.service";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {LoginResponse} from "../../models/user/login-response.model";

@Component({
  selector: 'app-rank-trip',
  templateUrl: './rank-trip.page.html',
  styleUrls: ['./rank-trip.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [DriverService, StudentService, AuthenticationService]
})


export class RankTripPage implements OnInit {
  loggedUser!: LoginResponse;
  userId!: number;
  userName!: string;
  userType!: UserType
  rankForm = this.fb.group({
    tripStars: [1, [Validators.required]],
  });
  ratingValue!: number;


  stars: { icon: string; color: string }[] = [
    {icon: 'star-outline', color: 'medium'},
    {icon: 'star-outline', color: 'medium'},
    {icon: 'star-outline', color: 'medium'},
    {icon: 'star-outline', color: 'medium'},
    {icon: 'star-outline', color: 'medium'},
  ];

  @Input() initialRating: number = 0;
  @Input() readonly: boolean = false;
  @Input() alignment = 'center';
  @Input() size: string = '2rem';
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private fb: FormBuilder,
              private driverService: DriverService,
              private route: ActivatedRoute,
              private toastService: ToastService,
              private router: Router,
              private studentService: StudentService,
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userType = params['userType']
      this.userId = params['userId'];
    })
    this.setRating(this.initialRating);
    if (this.userType === UserType.STUDENT) {
      this.driverService.findDriverById(this.userId).subscribe({
          next: next => {
            this.userName = next.name;
          }
        }
      )
    }
    if (this.userType === UserType.DRIVER) {
      this.studentService.findStudentById(this.userId).subscribe({
          next: next => {
            this.userName = next.name;
          }
        }
      )
    }
  }


  ratingDriver() {
    const rating: Rating = {
      rating: this.ratingValue
    }

    this.driverService.rankDriver(this.userId, rating).subscribe({
      next: next => {
        this.toastService.showSuccessToast("Carona finalizada com sucesso!");
        this.router.navigate(['/aluno']);
      },
      error: error => {
        this.toastService.showErrorToastAndLog("Houve algum erro ao avaliar o motorista", error);
      }
    });

  }

  ratingStudent() {
    const rating: Rating = {
      rating: this.ratingValue
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

  rate(value: number) {
    if (!this.readonly) {
      this.setRating(value);
    }
  }

  setRating(rating: number) {
    for (let i = 0; i < this.stars.length; i++) {
      if (rating >= i + 1) {
        this.stars[i].icon = 'star';
        this.stars[i].color = 'warning';
      } else if (rating > i) {
        this.stars[i].icon = 'star-half';
        this.stars[i].color = 'warning';
      } else {
        this.stars[i].icon = 'star-outline';
        this.stars[i].color = 'medium';
      }
    }
    this.ratingValue = rating;
    console.log(this.ratingValue)
    this.ratingChange.emit(rating);
  }

  protected readonly UserType = UserType;
}
