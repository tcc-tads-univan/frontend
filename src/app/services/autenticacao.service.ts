import { Injectable } from '@angular/core';

const USUARIO_AUTENTICADO = 'usuarioAutenticado';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor() { }

  autenticarUsuario() {
    localStorage.setItem(USUARIO_AUTENTICADO, 'true');
  }

  logout() {
    localStorage.removeItem(USUARIO_AUTENTICADO);
  }
}
