import {Injectable} from '@angular/core';
import {SolicitacaoCaronaDTO} from "../shared/models/solicitacao-carona-dto.model";
import {HttpClient} from "@angular/common/http";
import {getApiURL, httpOptions} from "../shared/utils";
import {Campus} from "../shared/models/campus.model";
import {LocalStorageService} from "./local-storage.service";
import {Carona} from "../shared/models/carona.model";
import {Agendamento} from "../shared/models/agendamento.model";

@Injectable({
  providedIn: 'root'
})
export class CarpoolService {
  API_URL = getApiURL("/api/College");
  MATEUS_WOSNIAKI_VERMENTO = getApiURL("/api/Schedule");

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
  }

  requestCarpool(campus: Campus, scheduleTime: string) {
    // POC
    const studentId = Math.floor((Math.random() * 100) + 1);
    const studentName = `Aluno ${studentId}`;

    this.localStorageService.saveUserInfo(studentId, studentName);
    this.localStorageService.saveCarpoolInfo(studentId, campus.collegeId, campus.collegeName);

    const request: SolicitacaoCaronaDTO = new SolicitacaoCaronaDTO(
      studentName,
      studentId,
      campus.lineAddress,
      scheduleTime
    );

    return this.http.post<SolicitacaoCaronaDTO>(`${this.API_URL}/${campus.collegeId}/Rides`, request, httpOptions);
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
    return this.http.get<SolicitacaoCaronaDTO[]>(`${this.API_URL}/${campusId}/Rides`, httpOptions);
  }

  cancelCarpoolRequest(studentId: number, campusId: number) {
    return this.http.delete(`${this.API_URL}/${campusId}/Rides/${studentId}`, httpOptions);
  }

  findCarpoolRequestByStudentAndCampus(studentId: number, campusId: number) {
    return this.http.get<SolicitacaoCaronaDTO>(`${this.API_URL}/${campusId}/Rides/${studentId}`, httpOptions);
  }

  socoNaCostelaDoMateusVermentoWosniaki() {
    const id = this.localStorageService.getUserInfo().studentId;
    return this.http.get<Agendamento>(`${this.MATEUS_WOSNIAKI_VERMENTO}/${id}`, httpOptions);
  }

  validateApprovedCarpoolRequest(carpoolId: number) {
    return this.http.post(`${this.MATEUS_WOSNIAKI_VERMENTO}/${carpoolId}/accept`, httpOptions);
  }
}
