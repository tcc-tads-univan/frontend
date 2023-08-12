import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication.service";
import {LoginDTO} from "../../shared/models/login-dto.model";

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.page.html',
  styleUrls: ['./autenticacao.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [AuthenticationService]
})
export class AutenticacaoPage implements OnInit {
  authForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    senha: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.email?.value && this.senha?.value) {
      const loginDTO = new LoginDTO(this.email.value, this.senha.value);
      this.authenticationService.authenticateUser(loginDTO);
    }
    console.log("Campos invalidos");
  }

  get email() {
    return this.authForm.get('email');
  }

  get senha() {
    return this.authForm.get('senha');
  }

}
