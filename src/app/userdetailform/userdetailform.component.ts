import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-userdetailform',
  templateUrl: './userdetailform.component.html',
  styleUrl: './userdetailform.component.css',
})
export class UserdetailformComponent implements OnInit {
  public formdata: any;
  //
  shippeddata: any;
  finalvalue: any;
  //
  constructor(private dataServie: DataService) {
    this.shippeddata = dataServie.setFinalCheckout();
    this.finalvalue = dataServie.setfinalprice();
    console.log(this.shippeddata, this.finalvalue);
  }
  public valueChangesSubscription: any;
  Signupform = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    city: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]*$/),
    ]),
  });
  loginUser() {
    this.dataServie.userdata(this.Signupform.value);
    console.log(this.Signupform.value);
  }
  ngOnInit() {
    this.formdata = this.Signupform.value;
    console.log(this.formdata);

    // this.valueChangesSubscription = this.Signupform.valueChanges.subscribe(
    //   (data) => {
    //     console.log('Form values changed:', data);
    //   }
    // );
  }
  //
  get username() {
    return this.Signupform.get('username');
  }
  get email() {
    return this.Signupform.get('email');
  }
  get address() {
    return this.Signupform.get('address');
  }
  get city() {
    return this.Signupform.get('city');
  }
  get pincode() {
    return this.Signupform.get('pincode');
  }
  get password() {
    return this.Signupform.get('password');
  }
}
