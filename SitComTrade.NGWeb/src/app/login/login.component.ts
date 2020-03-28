import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  UserName: any;
  countryPhoneCode: any;
  Password: any;
  registerForm: FormGroup;
  submitted = false;
  FullName: string;
  Email: string;
  Phone: number;
  Country = [];
  Currency: string;
  userinfo: any;
  // theCheckbox = false;
  currrency: any;
  a: any;
  b: any;
  marked: any;
  isSubmitted = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private loginservice: LoginService) {
    console.log('login loaded');


  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      country: ['', [Validators.required]],
      promoCode: [],
      currency: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phoneCode: ['']
    },

    );
    this.countryName(this.a);
    this.currencyName(this.b);
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
  }


  login() {
    this.http.post(`https://a67d5d81.ngrok.io/api/User/IsAuthenticated`, { UserName: this.UserName, Password: this.Password }
    )
      .subscribe(
        (
          data: boolean[]) => {
          if (data) {
            this.router.navigateByUrl('clients');
          } else {
            alert('Invalid Credential');
          }
        },
        err => {
          alert('Error');
        });
  }
  register() {
    this.userinfo = {
      FullName: this.registerForm.value.fullName,
      Email: this.registerForm.value.email,
      Phone: this.registerForm.value.phone,
      Country: this.registerForm.value.country,
      Currency: this.registerForm.value.currency,
      PromoCode: this.registerForm.value.promoCode,
      Password: this.registerForm.value.password
    };
    this.loginservice.saveUserInfo(this.userinfo).subscribe(res => {
      this.router.navigateByUrl('login');
    }
    );
  }
  // checkbox for terms and conditions
  // toggleVisibility(e) {
  //   this.marked = e.target.checked;
  // }
  // Choose city using select dropdown
  // Getter method to access formcontrols
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
        console.log(this.countryPhoneCode);
        // this.resetForm(this.countryPhoneCode);
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
}
// http:localhost59122
