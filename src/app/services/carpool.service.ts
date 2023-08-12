import {Injectable} from '@angular/core';
import {SolicitacaoCaronaDTO} from "../shared/models/solicitacao-carona-dto.model";
import {HttpClient} from "@angular/common/http";
import {httpOptions} from "../shared/utils";
import {Campus} from "../shared/models/campus.model";
import {LocalStorageService} from "./local-storage.service";
import {Carona} from "../shared/models/carona.model";
import {Agendamento} from "../shared/models/agendamento.model";

@Injectable({
  providedIn: 'root'
})
export class CarpoolService {
  BASE_URL = "https://backend.redisland-d18d0338.eastus2.azurecontainerapps.io";
  API_URL = this.BASE_URL + "/api/College";
  MATEUS_WOSNIAKI_VERMENTO = this.BASE_URL + "/api/Schedule";

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
  }

  solicitarCarona(campus: Campus, periodo: string) {
    // POC
    const idAluno = Math.floor((Math.random() * 100) + 1);
    const nomeAluno = `Aluno ${idAluno}`;

    this.localStorageService.saveUserInfo(idAluno, nomeAluno);
    this.localStorageService.saveCarpoolInfo(idAluno, campus.collegeId, campus.collegeName);

    const request: SolicitacaoCaronaDTO = new SolicitacaoCaronaDTO(
      nomeAluno,
      idAluno,
      campus.lineAddress,
      periodo
    );

    return this.http.post<SolicitacaoCaronaDTO>(`${this.API_URL}/${campus.collegeId}/Rides`, request, httpOptions);
  }

  aprovarSolicitacaoCarona(idAluno: number) {
    // POC
    const idMotorista = Math.floor((Math.random() * 100) + 1);
    const nomeMotorista = `Motorista ${idMotorista}`;

    const caronaStorage = this.localStorageService.getCarpoolInfo();
    const carona = new Carona(
      idMotorista,
      nomeMotorista,
      idAluno,
      caronaStorage.campusId,
      caronaStorage.collegeName
    );

    return this.http.post<Carona>(`${this.MATEUS_WOSNIAKI_VERMENTO}`, carona, httpOptions);
  }

  buscarSolicitacoesCaronaPorCampus(idCampus: number) {
    return this.http.get<SolicitacaoCaronaDTO[]>(`${this.API_URL}/${idCampus}/Rides`, httpOptions);
  }

  cancelarSolicitacaoCarona(idAluno: number, idCampus: number) {
    return this.http.delete(`${this.API_URL}/${idCampus}/Rides/${idAluno}`, httpOptions);
  }

  findCarpoolRequestByStudentAndCampus(studentId: number, campusId: number) {
    return this.http.get<SolicitacaoCaronaDTO>(`${this.API_URL}/${campusId}/Rides/${studentId}`, httpOptions);
  }

  socoNaCostelaDoMateusVermentoWosniaki() {
    const id = this.localStorageService.getUserInfo().studentId;
    return this.http.get<Agendamento>(`${this.MATEUS_WOSNIAKI_VERMENTO}/${id}`, httpOptions);
  }

  aceitarPropostaCarona(idCarona: number) {
    return this.http.post(`${this.MATEUS_WOSNIAKI_VERMENTO}/${idCarona}/accept`, httpOptions);
  }
}
