import { Injectable } from '@angular/core';
import {LoginDTO} from "../shared/models/login-dto.model";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private localStorageService: LocalStorageService) { }

  autenticarUsuario(login: LoginDTO) {
    this.localStorageService.salvarTokenAutenticacao(JSON.stringify(login));
  }

  logout() {
    this.localStorageService.limparTokenAutenticacao();
  }
}
