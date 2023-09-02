import {Injectable} from '@angular/core';
import {SolicitacaoCaronaDTO} from "../shared/models/solicitacao-carona-dto.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {getApiURL, httpOptions} from "../shared/utils";
import {LocalStorageService} from "./local-storage.service";
import {Carona} from "../shared/models/carona.model";
import {Agendamento} from "../shared/models/agendamento.model";
import {CollegeCampus} from "../shared/models/college-campus";
import {ApiEndpoints} from "../shared/enums/api-endpoints";
import {CarpoolRequest} from "../shared/models/carpool/carpool-request";
import {CarpoolDetails} from "../shared/models/carpool/carpool-details";
import {Schedule} from "../shared/models/carpool/schedule";

@Injectable({
  providedIn: 'root'
})
export class CarpoolService {
  RIDE_API = getApiURL(ApiEndpoints.RIDE);
  CAMPI_API: string = getApiURL(ApiEndpoints.CAMPI);
  SCHEDULE_API: string = getApiURL(ApiEndpoints.SCHEDULE);
  MATEUS_WOSNIAKI_VERMENTO = getApiURL("/api/Schedule");
  STUDENT_API: string = getApiURL(ApiEndpoints.STUDENT);
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
  }

  requestCarpool(campus: CollegeCampus, scheduleTime: string) {
    // POC
    const studentId = Math.floor((Math.random() * 100) + 1);
    const studentName = `Aluno ${studentId}`;

    this.localStorageService.saveUserInfo(studentId, studentName);
    this.localStorageService.saveCarpoolInfo(studentId, campus.campusId!, campus.college?.name!);

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
    const driverName = `Motorista ${driverId}`;

    const caronaStorage = this.localStorageService.getCarpoolInfo();
    const carona = {
      driverId,
      studentId,
      campusId: caronaStorage.campusId,
    };
    return this.http.post<Carona>(`${this.SCHEDULE_API}`, carona, httpOptions);
  }

  findCarpoolRequestsByCampus(campusId: number) {
    return this.http.get<SolicitacaoCaronaDTO[]>(`${this.CAMPI_API}/${campusId}/rides`, httpOptions);
  }

  cancelCarpoolRequest(studentId: number, campusId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }
      ),
      body: {studentId, campusId}
    }
    return this.http.delete(`${this.RIDE_API}`, httpOptions);
  }

  findCarpoolRequestByStudentAndCampus(studentId: number, campusId: number) {
    const API = getApiURL(ApiEndpoints.CAMPI);

    return this.http.get<CarpoolDetails>(`${API}/${campusId}/Student/${studentId}/Ride`, httpOptions);
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
    return this.http.put(`${this.MATEUS_WOSNIAKI_VERMENTO}/${carpoolId}/accept`, httpOptions);
  }
}
