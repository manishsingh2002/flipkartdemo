import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  register(regform: NgForm) {
    console.log(regform.value);
  }

  reset(regForm: NgForm) {
    console.log(regForm.value);
  }
}
