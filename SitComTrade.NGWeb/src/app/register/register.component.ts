import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { MustMatch } from 'src/app/common/validators/confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: number;
  Country = [];
  Currency: string;
  submitted = false;
  userinfo: any;
  countryPhoneCode: any;
  currrency: any;
  a: any;
  b: any;
  marked: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private loginservice: LoginService) {
    console.log('register loaded');
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      country: ['', [Validators.required]],
      promoCode: [],
      currency: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phoneCode: ['']
    },{
        validator: MustMatch('password', 'confirmPassword')
      });
    this.countryName(this.a);
    this.currencyName(this.b);
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
  }

  register() {
    this.userinfo = {
      FirstName: this.registerForm.value.firstName,
      LastName: this.registerForm.value.lastName,
      Email: this.registerForm.value.email,
      Phone: this.registerForm.value.phone,
      Country: this.registerForm.value.country,
      Currency: this.registerForm.value.currency,
      PromoCode: this.registerForm.value.promoCode,
      Password: this.registerForm.value.password
    };
    this.loginservice.saveUserInfo(this.userinfo)
      .subscribe(res => {
        this.router.navigateByUrl('login');
      }
      );
  }
  countryName(a) {
    this.loginservice.countryName(0).subscribe(result => {
      this.Country = result;
    });
  }
  getPhoneCode(val: any) {
    // console.log( typeof val);
    this.Country.forEach(element => {
      const y = +val;
      if (element.Id === y) {
        this.countryPhoneCode = element.ISDCode;
      }
    });
    this.registerForm.controls.phoneCode.setValue(
      '(+' + this.countryPhoneCode + ')'
    );
  }
  // choose currency using dropdown
  currencyName(a) {
    this.loginservice.currencyName(a).subscribe(result => {
      this.currrency = result;
    });
  }
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
}