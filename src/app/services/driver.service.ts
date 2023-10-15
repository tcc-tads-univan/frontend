import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DriverRegistration} from "../shared/models/driver/driver-registration";
import {getApiURL, httpOptions} from "../shared/utils";
import {ApiEndpoints} from "../shared/enums/api-endpoints";
import {Driver} from "../shared/models/driver/driver";
import {VehicleRegistration} from "../shared/models/vehicle/vehicle-registration";
import {Vehicle} from "../shared/models/vehicle/vehicle";
import {RegularStudentRegistration} from "../shared/models/regular-student/regular-student-registration";
import {Subscriptions} from "../shared/models/subscriptions/subscriptions";
import {Observable} from "rxjs";
import {RegularStudent} from "../shared/models/regular-student/regular-student";

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) {
  }

  registerDriver(driver: DriverRegistration) {
    const data = new FormData();
    Object.keys(driver).forEach(key => {
      // @ts-ignore
      data.append(key, driver[key]);
    });

    return this.http.post(getApiURL(ApiEndpoints.DRIVER), data);
  }

  updateDriverById(driverId: number, driver: DriverRegistration) {
    const endpoint = getApiURL(ApiEndpoints.DRIVER) + "/" + driverId;

    const data = new FormData();
    Object.keys(driver).forEach(key => {
      // @ts-ignore
      data.append(key, driver[key]);
    });

    return this.http.put(endpoint, data);
  }

  findDriverById(userId: number) {
    const endpoint = getApiURL(ApiEndpoints.DRIVER) + "/" + userId;
    return this.http.get<Driver>(endpoint);
  }

  createVehicle(vehicle: VehicleRegistration, driverId: number) {
    return this.http.post(getApiURL(ApiEndpoints.DRIVER + "/" + driverId + "/vehicle"), vehicle, httpOptions);
  }

  findVehicleById(driverId: number, vehicleId: number) {
    const endpoint = getApiURL(ApiEndpoints.DRIVER + "/" + driverId + "/vehicle/" + vehicleId )
    return this.http.get<Vehicle>(endpoint);
  }

  inviteStudent(regularStudent: RegularStudentRegistration) {
    return this.http.post(getApiURL(ApiEndpoints.DRIVER + "/invite-student"), regularStudent, httpOptions)
  }

  findDriverSubscriptions(driverId: number): Observable<Subscriptions> {
    return this.http.get<Subscriptions>(getApiURL(ApiEndpoints.DRIVER + "/" + driverId + "/subscriptions"), httpOptions)
  }

  findDriverSubscriptionsById(driverId: number, subscriptionId: number) {
    return this.http.get<RegularStudent>(getApiURL(ApiEndpoints.DRIVER + "/" + driverId + "/subscriptions/" + subscriptionId), httpOptions)
  }

  deleteDriverVehicle(driverId: number, vehicleId: number) {
    return this.http.delete<Vehicle>(getApiURL(ApiEndpoints.DRIVER + "/" + driverId + "/vehicle/" + vehicleId), httpOptions)
  }

}

