import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {AuthenticationService} from "../../services/authentication.service";
import {LoginDTO} from "../../shared/models/user/login-dto.model";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [AuthenticationService]
})
export class AuthenticationPage implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder, private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  handleSubmit() {
    if (this.loginForm.valid) {
      const loginDTO: LoginDTO = {email: this.email!.value ?? '', password: this.password!.value ?? ''};
      this.authService.authenticateUser(loginDTO);

      console.log(loginDTO);
    } else {
      console.log("Campos inválidos");
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
