import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-univan-logo',
  templateUrl: './univan-logo.component.html',
  styleUrls: ['./univan-logo.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class UnivanLogoComponent implements OnInit {
  @Input()
  size!: "small" | "medium" | "large";

  fontSize = {"font-size": "80vw"};

  constructor() {
  }

  ngOnInit() {
    switch (this.size) {
      case "large":
        this.fontSize["font-size"] = "80vw";
        break;
      case "medium":
        this.fontSize["font-size"] = "45vw";
        break;
      case "small":
        this.fontSize["font-size"] = "30vw";
        break;
    }
  }

}
