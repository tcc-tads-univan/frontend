import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {DriverService} from "../../services/driver.service";
import {LoginResponse} from "../../shared/models/user/login-response.model";
import {Observable} from "rxjs";
import {DriverSubscriptions} from "../../shared/models/subscriptions/driver-subscriptions";
import {LocalStorageService} from "../../services/local-storage.service";
import {RegularStudent} from "../../shared/models/regular-student/regular-student";

@Component({
    selector: 'app-register-edit-regular-student',
    templateUrl: './register-edit-regular-student.page.html',
    styleUrls: ['./register-edit-regular-student.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
    providers: [DriverService]
})
export class RegisterEditRegularStudentPage implements OnInit {

    private loggedUser!: null | LoginResponse;
    subscription$!: Observable<DriverSubscriptions>
    isModalOpen: boolean = false;
    regularStudent$!: Observable<RegularStudent>
    driverName: string | undefined;
    driverId: number = 0;
    constructor(private driverService: DriverService, private localStorageService: LocalStorageService) {
    }

    ngOnInit() {
        this.loggedUser = this.localStorageService.loggedUser;
        if (!this.loggedUser) {
            throw new Error("User is not logged in");
        }
        this.driverName = this.loggedUser.name;
        this.driverId = this.loggedUser.userId;
        this.subscription$! = this.driverService.findDriverSubscriptions(this.loggedUser?.userId);
    }

    setOpen(isOpen: boolean) {
        this.isModalOpen = isOpen;
    }
    handleModal(subscriptionId: number) {
        this.regularStudent$! = this.driverService.findDriverSubscriptionsById(this.driverId, subscriptionId)
        this.setOpen(true);
        console.log(this.regularStudent$);
    }


}
