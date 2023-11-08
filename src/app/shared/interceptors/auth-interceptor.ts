import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from 'src/app/services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loggedUser = this.authService.loggedUser;

    if (!loggedUser) {
      return next.handle(req);
    }

    const cloneReq = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + loggedUser.token)
    });

    return next.handle(cloneReq);
  }
}
