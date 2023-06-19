import {Injectable} from '@angular/core';
import {SolicitacaoCaronaDTO} from "../shared/models/solicitacao-carona-dto.model";
import {HttpClient} from "@angular/common/http";
import {httpOptions} from "../shared/utils";

@Injectable({
  providedIn: 'root'
})
export class CaronaService {
  BASE_URL = "https://backend.redisland-d18d0338.eastus2.azurecontainerapps.io";
  API_URL = this.BASE_URL + "/api/College";

  constructor(private http: HttpClient) {
  }

  solicitarCarona(aluno: string, campus: string, enderecoDestino: string, periodo: string) {
    const request: SolicitacaoCaronaDTO = {
      name: aluno,
      lineAddress: enderecoDestino,
      userId: 1,
      scheduleTime: periodo
    }
    return this.http.post<SolicitacaoCaronaDTO>(`${this.API_URL}/${campus}/Rides`, request, httpOptions);
  }

  // DS - HU07 -> param = idCarona: int
  aprovarSolicitacaoCarona(idAluno: number) {
    return this.http.post(`${this.API_URL}/TODO`, {}, httpOptions);
  }

  buscarSolicitacoesCaronaPorCampus(idCampus: number) {
    return this.http.get<SolicitacaoCaronaDTO[]>(`${this.API_URL}/${idCampus}/Rides`, httpOptions);
  }

  cancelarSolicitacaoCarona(idAluno: number, idCampus: number) {
    return this.http.delete(`${this.API_URL}/${idCampus}/Rides/${idAluno}`, httpOptions);
  }

  buscarSolicitacaoCaronaPorCampusEAluno(idAluno: number, idCampus: number) {
    return this.http.get<SolicitacaoCaronaDTO>(`${this.API_URL}/${idCampus}/Rides/${idAluno}`, httpOptions);
  }
}
