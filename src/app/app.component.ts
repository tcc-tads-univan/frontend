import {Component, EnvironmentInjector, inject} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule],
})
export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
  }
}
