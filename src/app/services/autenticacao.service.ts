import { Injectable } from '@angular/core';
import {LoginDTO} from "../shared/models/login-dto.model";

const USUARIO_AUTENTICADO = 'usuarioAutenticado';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor() { }

  autenticarUsuario(login: LoginDTO) {
    localStorage.setItem(USUARIO_AUTENTICADO, 'true[' + JSON.stringify(login) + ']');
  }

  logout() {
    localStorage.removeItem(USUARIO_AUTENTICADO);
  }
}
