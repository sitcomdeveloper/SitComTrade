import { Component, OnInit } from '@angular/core';
import { ClientsService } from '././clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  columnDefs = [
  ];


  rowData = [
  ];
  accountInfo: any[];
  leadInfo: any[];
  clientInfo: any[];

  constructor(private _clientservice: ClientsService, private router: Router) { }

  ngOnInit() {
    this.userDetails();
  }
  userDetails() {
    this._clientservice.getUsers(this.clientInfo).subscribe(res => {
      if (res !== null && res !== undefined && res !== '') {
        this.rowData = res;
        this.accountInfo = this.rowData.filter(m => {
          if (m.TypeName === 'Real') {
            return m;
          }
        })
        this.leadInfo = this.rowData.filter(p => {
          if (p.TypeName === 'Lead') {
            return p;
          }
        })
      }
    });
  }
  userClick() {
    this.router.navigateByUrl('/info');
  }
}