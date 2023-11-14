import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {getApiURL, httpOptions} from "../shared/utils";
import {ApiEndpoints} from "../shared/enums/api-endpoints";
import {CarpoolRequest} from "../shared/models/carpool/carpool-request";
import {CarpoolDetails} from "../shared/models/carpool/carpool-details";
import {Schedule} from "../shared/models/carpool/schedule";
import {RequestedCarpool} from "../shared/models/carpool/requested-carpool";
import {RouteDirections} from "../shared/models/address/route-directions";

@Injectable({
  providedIn: 'root'
})
export class CarpoolService {
  RIDE_API: string = getApiURL(ApiEndpoints.RIDE);
  CAMPI_API: string = getApiURL(ApiEndpoints.CAMPI);
  SCHEDULE_API: string = getApiURL(ApiEndpoints.SCHEDULE);
  ROUTES_API: string = getApiURL(ApiEndpoints.ROUTES);

  constructor(private http: HttpClient) {
  }

  requestCarpool(campusId: number, studentId: number, scheduleTime: string) {
    const body: CarpoolRequest = {studentId, campusId, scheduleTime};
    return this.http.post(this.RIDE_API, body, httpOptions);
  }

  approveCarpoolRequest(studentId: number, driverId: number, campusId: number, price: string) {
    const body = {driverId, studentId, campusId, price};
    return this.http.post(this.SCHEDULE_API, body, httpOptions);
  }

  findCarpoolRequestsByCampus(campusId: number) {
    return this.http.get<RequestedCarpool[]>(`${this.CAMPI_API}/${campusId}/rides`, httpOptions);
  }

  cancelCarpoolRequest(studentId: number, campusId: number) {
    const cancelCarpoolHttpHeaders = {
      ...httpOptions,
      body: {studentId, campusId}
    }
    return this.http.delete(`${this.RIDE_API}`, cancelCarpoolHttpHeaders);
  }

  findCarpoolRequestByStudentAndCampus(studentId: number, campusId: number) {
    return this.http.get<CarpoolDetails>(`${this.RIDE_API}?campusId=${campusId}&studentId=${studentId}`, httpOptions);
  }

  findScheduleByStudentId(studentId: number) {
    return this.http.get<Schedule>(`${this.SCHEDULE_API}?studentId=${studentId}`, httpOptions);
  }

  findScheduleById(scheduleId: number) {
    return this.http.get<Schedule>(`${this.SCHEDULE_API}/${scheduleId}`, httpOptions);
  }

  approveSchedule(scheduleId: number) {
    return this.http.put(`${this.SCHEDULE_API}/${scheduleId}/accept`, httpOptions);
  }

  declineSchedule(scheduleId: number) {
    return this.http.put(`${this.SCHEDULE_API}/${scheduleId}/reject`, httpOptions);
  }

  findRouteDirections(driverId: number, studentId: number) {
    return this.http.get<RouteDirections>(`${this.ROUTES_API}/directions?driverId=${driverId}&studentId=${studentId}`, httpOptions);
  }
}
