import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {getApiURL, httpOptions} from "../shared/utils";
import {LocalStorageService} from "./local-storage.service";
import {CollegeCampus} from "../shared/models/college/college-campus";
import {ApiEndpoints} from "../shared/enums/api-endpoints";
import {CarpoolRequest} from "../shared/models/carpool/carpool-request";
import {CarpoolDetails} from "../shared/models/carpool/carpool-details";
import {Schedule} from "../shared/models/carpool/schedule";
import {RequestedCarpool} from "../shared/models/carpool/requested-carpool";

@Injectable({
  providedIn: 'root'
})
export class CarpoolService {
  RIDE_API = getApiURL(ApiEndpoints.RIDE);
  CAMPI_API: string = getApiURL(ApiEndpoints.CAMPI);
  SCHEDULE_API: string = getApiURL(ApiEndpoints.SCHEDULE);
  STUDENT_API: string = getApiURL(ApiEndpoints.STUDENT);

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
  }

  requestCarpool(campus: CollegeCampus, scheduleTime: string) {
    // POC
    const studentId = Math.floor((Math.random() * 100) + 1);
    const studentName = `Aluno ${studentId}`;

    this.localStorageService.saveUserInfo(studentId, studentName);
    this.localStorageService.saveCarpool(studentId, campus.campusId!);

    const request: CarpoolRequest = {
      studentId,
      campusId: campus.campusId!,
      scheduleTime
    };

    return this.http.post(this.RIDE_API, request, httpOptions);
  }

  approveCarpoolRequest(studentId: number) {
    // POC
    const driverId = Math.floor((Math.random() * 100) + 1);

    const caronaStorage = this.localStorageService.getCarpool();
    const carona = {
      driverId,
      studentId,
      campusId: caronaStorage.campusId,
    };
    return this.http.post(this.SCHEDULE_API, carona, httpOptions);
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
    return this.http.get<CarpoolDetails>(`${this.CAMPI_API}/${campusId}/Student/${studentId}/Ride`, httpOptions);
  }

  getSchedule() {
    const studentId = this.localStorageService.getUserInfo().studentId;
    return this.http.get<Schedule>(`${this.STUDENT_API}/${studentId}/schedule`, httpOptions);
  }

  getScheduleInfo() {
    const scheduleId = this.localStorageService.getSchedule().scheduleId;
    return this.http.get<Schedule>(`${this.SCHEDULE_API}/${scheduleId}`, httpOptions);
  }

  validateApprovedCarpoolRequest(carpoolId: number) {
    return this.http.put(`${this.SCHEDULE_API}/${carpoolId}/accept`, httpOptions);
  }
}
