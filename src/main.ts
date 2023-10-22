import {enableProdMode, importProvidersFrom} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {RouteReuseStrategy, provideRouter} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {routes} from './app/app.routes';
import {AppComponent} from './app/app.component';
import {environment} from './environments/environment';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./app/shared/interceptors/auth-interceptor";
import {AuthGuardService} from "./app/auth/auth.guard";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes),
    AuthGuardService
  ],
});
