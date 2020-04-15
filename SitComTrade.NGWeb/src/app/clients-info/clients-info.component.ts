import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-info',
  templateUrl: './clients-info.component.html',
  styleUrls: ['./clients-info.component.css']
})
export class ClientsInfoComponent implements OnInit {
  userid: any;
  Apptitle: any;
  userGenralinfo: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.userid = '1';
    this.Apptitle = JSON.parse(localStorage.getItem('project'));
    console.log('getclientdata', this.Apptitle);
    this.userGenralinfo = this.Apptitle;
  }
  // genInfo() {

  //    this.router.navigateByUrl('/generalinfo/:1');

  // }

}
