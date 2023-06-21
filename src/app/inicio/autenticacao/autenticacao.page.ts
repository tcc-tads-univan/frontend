import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AutenticacaoService} from "../../services/autenticacao.service";
import {LoginDTO} from "../../shared/models/login-dto.model";

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.page.html',
  styleUrls: ['./autenticacao.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [AutenticacaoService]
})
export class AutenticacaoPage implements OnInit {
  authForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    senha: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private autenticacaoService: AutenticacaoService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.email?.value && this.senha?.value) {
      const loginDTO = {
        email: this.email.value,
        senha: this.senha.value
      }
      this.autenticacaoService.autenticarUsuario(loginDTO);
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
