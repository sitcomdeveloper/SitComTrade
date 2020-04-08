import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-info',
  templateUrl: './clients-info.component.html',
  styleUrls: ['./clients-info.component.css']
})
export class ClientsInfoComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  genInfo() {
     this.router.navigateByUrl('/generalinfo/:1');
     
  }

}
