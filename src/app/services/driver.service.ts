import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DriverRegistration} from "../shared/models/driver/driver-registration";
import {getApiURL} from "../shared/utils";
import {ApiEndpoints} from "../shared/enums/api-endpoints";

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) {
  }

  registerDriver(driverRegistration: DriverRegistration) {
    const data = new FormData();
    Object.keys(driverRegistration).forEach(key => {
      // @ts-ignore
      data.append(key, driverRegistration[key]);
    });

    return this.http.post(getApiURL(ApiEndpoints.DRIVER), data);
  }
}
