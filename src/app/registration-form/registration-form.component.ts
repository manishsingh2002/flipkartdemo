import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
})
export class RegistrationFormComponent implements OnInit {
  RegistrationForm: any;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.RegistrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  registerUser() {
    const email = this.RegistrationForm.value?.email;
    const password = this.RegistrationForm.value?.password;

    if (email && password) {
      this.auth.RegisterUser(email, password);
    } else {
    }
  }
  resetUser() {
    this.RegistrationForm.reset();
  }
}
