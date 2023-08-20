import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DriverRegistration} from "../shared/models/driver-registration";
import {getApiURL, httpOptions} from "../shared/utils";
import {ApiEndpoints} from "../shared/enums/api-endpoints";

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  registerDriver(driverRegistration: DriverRegistration) {
    const driverRegistrationRequest = JSON.stringify(driverRegistration);
    return this.http.post<DriverRegistration>(getApiURL(ApiEndpoints.DRIVER), driverRegistrationRequest, httpOptions);
  }
}
