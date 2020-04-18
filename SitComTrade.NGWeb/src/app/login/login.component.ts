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
  userinfo: any;
  currrency: any;
  a: any;
  b: any;
  marked: any;
  isSubmitted = false;
  pwdrecover: any;
  getPassword: any;
  resetForm: FormGroup;

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
      email: ['', [Validators.required, Validators.email]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
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
          } else {
            alert('Invalid Credential');
          }
        },
        err => {
          alert('Error');
        });
  }
  resetpwd() {
    let obj = {
      username: this.resetForm.value.email,
    }
    this.loginservice.resetPassword(obj).subscribe(res =>{
      this.getPassword = res;
      console.log('pwd', res);
    })
  }
}
