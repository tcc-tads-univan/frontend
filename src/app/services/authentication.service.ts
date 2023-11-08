import {Injectable} from '@angular/core';
import {LoginRequest} from "../shared/models/user/login-request.model";
import {HttpClient} from "@angular/common/http";
import {getApiURL, httpOptions} from "../shared/utils";
import {ApiEndpoints} from "../shared/enums/api-endpoints";
import {LoginResponse} from "../shared/models/user/login-response.model";
import {LocalStorageKeys} from '../shared/enums/local-storage-keys';
import {of} from "rxjs";
import {UserType} from "../shared/enums/user-type";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private mockAuth = true;

  constructor(private http: HttpClient) {
  }

  authenticateUser(login: LoginRequest) {
    if (this.mockAuth) {
      return of({userId: 1, userType: UserType.DRIVER, name: 'mock', token: 'mock'} as LoginResponse);
    } else {
      return this.http.post<LoginResponse>(getApiURL(ApiEndpoints.LOGIN), login, httpOptions);
    }
  }

  logout() {
    localStorage.removeItem(LocalStorageKeys.AUTH);
  }

  saveAuthenticationInfo(user: LoginResponse) {
    localStorage.setItem(LocalStorageKeys.AUTH, JSON.stringify(user));
  }

  get loggedUser() {
    const user = localStorage.getItem(LocalStorageKeys.AUTH);

    if (!user) {
      return null;
    }

    return JSON.parse(user) as LoginResponse;
  }
}
