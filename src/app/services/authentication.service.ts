import {Injectable} from '@angular/core';
import {LoginDTO} from "../shared/models/user/login-dto.model";
import {LocalStorageService} from "./local-storage.service";
import {HttpClient} from "@angular/common/http";
import {getApiURL, httpOptions} from "../shared/utils";
import {ApiEndpoints} from "../shared/enums/api-endpoints";
import {LoginResponse} from "../shared/models/user/login-response.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService) {
  }

  authenticateUser(login: LoginDTO) {
    return this.http.post<LoginResponse>(getApiURL(ApiEndpoints.LOGIN), login, httpOptions);
  }

  logout() {
    this.localStorageService.clearAuthentication();
  }
}
