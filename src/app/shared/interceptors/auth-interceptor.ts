import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocalStorageService} from "../../services/local-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loggedUser = this.localStorageService.loggedUser;

    if (!loggedUser) {
      return next.handle(req);
    }

    const cloneReq = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + loggedUser.token)
    });

    return next.handle(cloneReq);
  }
}
