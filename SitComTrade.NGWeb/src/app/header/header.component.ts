import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  todayDate : Date = new Date();
  router: any;
  constructor() { }

  ngOnInit() {
  }
  logout() {
    // localStorage.removeItem('uid');
    localStorage.clear();
    this.router.navigate(['login']);
  }
  open()
  {
    this.router.navigate(['login']);
  }

}
