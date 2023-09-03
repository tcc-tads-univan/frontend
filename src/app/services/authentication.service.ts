import {Injectable} from '@angular/core';
import {LoginDTO} from "../shared/models/user/login-dto.model";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private localStorageService: LocalStorageService) {
  }

  authenticateUser(login: LoginDTO) {
    this.localStorageService.saveAuthToken(JSON.stringify(login));
  }

  logout() {
    this.localStorageService.clearAuthToken();
  }
}
