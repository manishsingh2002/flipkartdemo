import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit {
  LoginForm: any;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  loginUser() {
    const email = this.LoginForm.value?.email;
    const password = this.LoginForm.value?.password;

    if (email && password) {
      this.auth.LoginUser(email, password);
    } else {
    }
  }
  resetUser() {
    this.LoginForm.reset();
  }
}
