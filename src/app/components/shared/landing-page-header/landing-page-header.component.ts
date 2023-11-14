import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing-page-header',
  templateUrl: './landing-page-header.component.html',
  styleUrls: ['./landing-page-header.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ],
  providers: [AuthenticationService]
})
export class LandingPageHeaderComponent implements OnInit {
  @Input({required: true})
  username!: string;

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
