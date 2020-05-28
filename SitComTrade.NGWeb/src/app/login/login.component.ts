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
  Password: any;
  loginForm: FormGroup;
  submitted = false;
  resetError: boolean;
  btndisable = true;
  green = false;
  red = false;
  ResetPWdResponse1: any;
  userinfo: any;
  currrency: any;
  a: any;
  b: any;
  marked: any;
  pwdrecover: any;
  getPassword: any;
  resetForm: FormGroup;
  ResetPWdResponse: any;
  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private loginservice: LoginService) {
    console.log('login loaded');
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-z0-9A-Z]+$')]],
      rememberMe: []
    });
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'), Validators.email]]
    });
    if (window.sessionStorage.getItem('userToken') != null) {
      this.router.navigateByUrl('clients');
    }
  }

  get f() {
    return this.resetForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
  }
  reset() {
    this.submitted = true;
    if (this.resetForm.invalid) {
        return;
    }
}


  login() {
    this.userinfo = {
      UserName: this.loginForm.value.email,
      Password: this.loginForm.value.password
    };
    this.loginservice.loginUser(this.userinfo)
      .subscribe(
        (
          data: boolean[]) => {
          if (data) {
            this.router.navigateByUrl('clients');
            console.log('LoginDetails', data);
            // localStorage.clear();
            localStorage.setItem('project', JSON.stringify(data));
            console.log('stringifydata', JSON.stringify(data));
            localStorage.setItem('uid', this.UserName);
          } else {
            alert('Invalid Credential');
          }
        },
        err => {
          alert('Error');
        });
  }
  // authUser() {
  //   let model = "UserName=" +this.loginForm.value.email + "&Password=" +this.loginForm.value.password + '&grant_type=password';
  //   this.loginservice.authuser(model)
  //   .subscribe(
  //     data => {
  //       if (data) {
  //         window.sessionStorage.setItem('userToken', data.access_token);
  //         window.sessionStorage.setItem('username', JSON.stringify(data));
  //       console.log('setToken', data.access_token)
  //       this.router.navigateByUrl('clients');
  //       console.log('testing',data);
  //       } else {
  //         alert('Invalid Credential');
  //       }
  //     },
  //     err => {
  //       alert('Error');
  //     });

  // }
  resetpwd() {
     const obj = this.resetForm.value.email;
     if (this.resetForm.valid) {
      // this.resetForm.controls.email.enable();
      this.loginservice.resetPassword(obj).subscribe(res => {
       console.log('rstpwd', res);
       if (res === 'Invalid User') {
        // this.ResetPWdResponse = '!Invalid User';
        this.green = false;
        this.red = true;
        this.resetError = true;
        // alert('Invalid User!');
       } else if (res === 'Success') {
        //  this.ResetPWdResponse1 = '!Success';
         this.red = false;
         this.green = true;
         this.resetError = true;
        //  alert('Success! Your login credentials is sent to your email');
 }       else {
         this.ResetPWdResponse = 'Failure';
         this.green = false;
         this.red = true;
         this.resetError = true;
 }
    });
  } else {
    // alert('wrong');
    // this.resetForm.controls.email.disable();

  }
    //  this.ResetPWdResponse  = '';
    //  this.ResetPWdResponse1 = '';
    //  this.resetForm.reset();

  }
  change() {
    if (this.resetForm.valid) {
   this.btndisable = false;
  }
}

}
