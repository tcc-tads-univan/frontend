import { Injectable } from '@angular/core';
import {Agendamento} from "../shared/models/agendamento.model";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  ALUNO_STORAGE = 'alunoStorage';
  AGENDAMENTO_STORAGE = 'agendamentoStorage';
  AUTH_STORAGE = 'authToken';
  CARONA_STORAGE = 'caronaStorage';

  constructor() { }

  salvarTokenAutenticacao(token: string) {
    localStorage.setItem(this.AUTH_STORAGE, 'true[' + token + ']');
  }

  limparTokenAutenticacao() {
    localStorage.removeItem(this.AUTH_STORAGE);
  }

  salvarAluno(idAluno: number, nomeAluno: string) {
    localStorage.setItem(this.ALUNO_STORAGE, JSON.stringify({idAluno, nomeAluno}));
  }

  recuperarAluno(): {idAluno: number, nomeAluno: string} {
    return JSON.parse(localStorage.getItem(this.ALUNO_STORAGE) ?? JSON.stringify({}));
  }

  salvarCarona(idAluno: number, idCampus: number, nomeUniversidade: string) {
    localStorage.setItem(this.CARONA_STORAGE, JSON.stringify({idAluno, idCampus, nomeUniversidade}));
  }

  recuperarCarona(): {idAluno: number, idCampus: number, nomeUniversidade: string}  {
    return JSON.parse(localStorage.getItem(this.CARONA_STORAGE) ?? JSON.stringify({}));
  }

  enfiarUmaFacaNoEstomagoDoMateusWosniaki(agenamento: Agendamento) {
    localStorage.setItem(this.AGENDAMENTO_STORAGE, JSON.stringify(agenamento));
  }

  fuzilarOMateusWosniaki(): Agendamento {
    return JSON.parse(localStorage.getItem(this.AGENDAMENTO_STORAGE) ?? JSON.stringify({}));
  }
}
