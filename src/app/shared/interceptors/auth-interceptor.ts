import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocalStorageKeys} from "../enums/local-storage-keys";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loggedUserAsString = localStorage.getItem(LocalStorageKeys.AUTH);

    if (loggedUserAsString) {
      const loggedUser = JSON.parse(loggedUserAsString);

      if (loggedUser && loggedUser.hasOwnProperty('token')) {
        const cloneReq = req.clone({
          headers: req.headers.set("Authorization", "Bearer " + loggedUser.token)
        });

        return next.handle(cloneReq);
      }
    }

    return next.handle(req);
  }
}
