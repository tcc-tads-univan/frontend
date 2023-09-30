import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-register-edit-destination',
    templateUrl: './register-edit-destination.page.html',
    styleUrls: ['./register-edit-destination.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterLink]
})
export class RegisterEditDestinationPage implements OnInit {
    addressForm = this.fb.group({
        address: ['', [Validators.required]]
    });

    constructor(private fb: FormBuilder, private http: HttpClient) {
    }

    ngOnInit() {
        this.addressForm
            .get('address')!
            .valueChanges
            .subscribe(value => console.log('value changed', value));
    }

    handleSubmit() {
        const baseURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json"
        const input = encodeURI("?input=rua teste da silva ssauro");
        const params = {
            types: "address",
            language: "pt_BR",
            key: "minhaCHAVE"
        }

        let API = baseURL + input;
        for (const key of Object.keys(params)) {
            // @ts-ignore
            API = API + "&" + key + "=" + params[key];
        }
    }
}
