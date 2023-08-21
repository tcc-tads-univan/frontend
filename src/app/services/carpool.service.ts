import {Injectable} from '@angular/core';
import {SolicitacaoCaronaDTO} from "../shared/models/solicitacao-carona-dto.model";
import {HttpClient} from "@angular/common/http";
import {getApiURL, httpOptions} from "../shared/utils";
import {LocalStorageService} from "./local-storage.service";
import {Carona} from "../shared/models/carona.model";
import {Agendamento} from "../shared/models/agendamento.model";
import {CollegeCampus} from "../shared/models/college-campus";
import {ApiEndpoints} from "../shared/enums/api-endpoints";
import {CarpoolRequest} from "../shared/models/carpool/carpool-request";
import {CarpoolDetails} from "../shared/models/carpool/carpool-details";

@Injectable({
  providedIn: 'root'
})
export class CarpoolService {
  RIDE_API = getApiURL(ApiEndpoints.RIDE);
  MATEUS_WOSNIAKI_VERMENTO = getApiURL("/api/Schedule");

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

    return this.http.post(`${this.RIDE_API}`, request, httpOptions);
  }

  approveCarpoolRequest(studentId: number) {
    // POC
    const driverId = Math.floor((Math.random() * 100) + 1);
    const driverName = `Motorista ${driverId}`;

    const caronaStorage = this.localStorageService.getCarpoolInfo();
    const carona = new Carona(
      driverId,
      driverName,
      studentId,
      caronaStorage.campusId,
      caronaStorage.collegeName
    );

    return this.http.post<Carona>(`${this.MATEUS_WOSNIAKI_VERMENTO}`, carona, httpOptions);
  }

  findCarpoolRequestsByCampus(campusId: number) {
    return this.http.get<SolicitacaoCaronaDTO[]>(`${this.RIDE_API}/${campusId}/Rides`, httpOptions);
  }

  cancelCarpoolRequest(studentId: number, campusId: number) {
    return this.http.delete(`${this.RIDE_API}/${campusId}/Rides/${studentId}`, httpOptions);
  }

  findCarpoolRequestByStudentAndCampus(studentId: number, campusId: number) {
    const API = getApiURL(ApiEndpoints.CAMPI);

    return this.http.get<CarpoolDetails>(`${API}/${campusId}/Student/${studentId}/Ride`, httpOptions);
  }

  socoNaCostelaDoMateusVermentoWosniaki() {
    const id = this.localStorageService.getUserInfo().studentId;
    return this.http.get<Agendamento>(`${this.MATEUS_WOSNIAKI_VERMENTO}/${id}`, httpOptions);
  }

  validateApprovedCarpoolRequest(carpoolId: number) {
    return this.http.post(`${this.MATEUS_WOSNIAKI_VERMENTO}/${carpoolId}/accept`, httpOptions);
  }
}
