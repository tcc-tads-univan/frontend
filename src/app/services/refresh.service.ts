import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  constructor(private router: Router) {
  }

  handleRefresh() {
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }

  handleRefreshForStudent() {
    setTimeout(() => {
      this.router.navigate(['aluno/inicio']);
    }, 1);
  }
}
