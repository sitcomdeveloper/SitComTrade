import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  todayDate: Date = new Date();
  router: any;
  getLoginDetails: any;
  bindLoginData: any;
  constructor() { }

  ngOnInit() {
    // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(localStorage.getItem('project'));
    console.log('LoginData', this.getLoginDetails);
    this.bindLoginData = this.getLoginDetails;
  }
  logout() {
    // localStorage.removeItem('uid');
    localStorage.clear();
    this.router.navigate(['login']);
  }
  open() {
    this.router.navigate(['login']);
  }

}
