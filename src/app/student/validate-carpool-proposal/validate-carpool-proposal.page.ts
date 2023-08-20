import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CarpoolService} from "../../services/carpool.service";
import {Observable} from "rxjs";
import {LocalStorageService} from "../../services/local-storage.service";
import {Agendamento} from "../../shared/models/agendamento.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-validate-carpool-proposal',
    templateUrl: './validate-carpool-proposal.page.html',
    styleUrls: ['./validate-carpool-proposal.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule],
    providers: [CarpoolService, LocalStorageService]
})
export class ValidateCarpoolProposalPage implements OnInit {
    agendamento$!: Observable<Agendamento>;

    constructor(private carpoolService: CarpoolService, private router: Router, private poc: LocalStorageService) {
    }

    ngOnInit() {
        // poc
        this.agendamento$ = this.carpoolService.socoNaCostelaDoMateusVermentoWosniaki();
    }

    approveCarpoolProposal(carpoolId: number, pocado: Agendamento) {
        this.poc.enfiarUmaFacaNoEstomagoDoMateusWosniaki(pocado);
        this.carpoolService.validateApprovedCarpoolRequest(carpoolId).subscribe(_ => {
            console.log("Aprovado");
            this.router.navigate(['/aluno/carona-confirmada']);
        });
    }

}
