import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-empty-history-card',
  templateUrl: './empty-history-card.component.html',
  styleUrls: ['./empty-history-card.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterLink
  ]
})
export class EmptyHistoryCardComponent  implements OnInit {
  @Input({required: true})
  navigateTo!: string[];

  constructor() { }

  ngOnInit() {}

}
