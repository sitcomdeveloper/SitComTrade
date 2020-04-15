import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/header/clients/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private _clientservice: ClientsService,private router:Router) { }

  rowData = [];

  accountInfo: any[];
  leadInfo: any[];
  clientInfo:any[];

  ngOnInit() {
    this.userDetails();
  }
  userDetails() {
    this._clientservice.getUsers(this.clientInfo).subscribe(res => {
      if(res !== null && res !== undefined && res !== '') {
      this.rowData  = res;
      this.accountInfo =  this.rowData.filter(m => {
        if (m.TypeName === 'Real') {
          return m;
        }
      })
      this.leadInfo =  this.rowData.filter(p => {
        if(p.TypeName === 'Lead') {
          return p;
        }
      })
    }
    },);
      }
  userClick(selectedItem: any) {
    localStorage.clear();
    localStorage.setItem("project", JSON.stringify(selectedItem));
    this.router.navigateByUrl('/info');
    console.log("Selected item Id: ", selectedItem.ItemId);
  }
  newUser()
  {
    this.router.navigateByUrl('/user');
  }

}
