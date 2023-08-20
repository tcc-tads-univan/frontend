import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CarpoolService} from "../../services/carpool.service";
import {Campus} from "../../shared/models/campus.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-request-carpool',
    templateUrl: './request-carpool.page.html',
    styleUrls: ['./request-carpool.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
    providers: [CarpoolService]
})
export class RequestCarpoolPage implements OnInit {
    public campiList: Array<Campus> = [
        new Campus(1, 'Universidade Federal do Paraná', 'Rua João Assef 1010'),
        new Campus(2, 'Pontifícia Universidade Católica do Paraná', 'Rua João Assef 1011')
    ];
    public filteredCampiList = [...this.campiList];

    public avaliableHours: Array<number> = [];
    private _currentHour = new Date().getHours();

    selectedTimePeriod!: string;
    selectedCampus!: Campus;

    constructor(private carpoolService: CarpoolService, private router: Router) {
    }

    ngOnInit() {
        for (let i = this._currentHour; i < 24; i++) {
            this.avaliableHours.push(i);
        }
    }

    trackByItem(index: number, item: Campus) {
        return item.lineAddress;
    }

    handleInput(event: any) {
        const query = event.target.value.toLowerCase();
        this.filteredCampiList = this.campiList.filter((c) => c.collegeName.toLowerCase().indexOf(query) > -1);
    }

    handleSubmit() {
        if (this.selectedTimePeriod && this.selectedCampus) {
            // POC
            const date = new Date(this.selectedTimePeriod);
            this.carpoolService.requestCarpool(
                this.selectedCampus,
                `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
            ).subscribe(
                _ => {
                    console.log("Solicitado com sucesso!");
                }
            );
            this.router.navigate(['/aluno/carona-solicitada']);
        }
    }
}
