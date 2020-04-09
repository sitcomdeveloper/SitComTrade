import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-info',
  templateUrl: './clients-info.component.html',
  styleUrls: ['./clients-info.component.css']
})
export class ClientsInfoComponent implements OnInit {
userid: any;
  constructor(private router:Router) { }

  ngOnInit() {
    this.userid = '1';
  }
  genInfo() {
    
     this.router.navigateByUrl('/generalinfo/:1');
     
  }

}
