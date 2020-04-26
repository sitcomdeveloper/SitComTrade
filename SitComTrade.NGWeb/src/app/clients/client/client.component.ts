import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/header/clients/clients.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private clientService: ClientsService, private router: Router, private spinnerService: Ng4LoadingSpinnerService) { }

  rowData = [];
  deletbtnn = true;
  showMsg: any;
  accountInfo: any[];
  leadInfo: any[];
  clientInfo: any[];

  ngOnInit() {
    this.userDetails();
  }
  userDetails() {
    this.spinnerService.show();
    setTimeout( () => {
    this.clientService.getUsers(this.clientInfo).subscribe(res => {
      if (res !== null && res !== undefined && res !== '') {
        this.rowData = res;
        this.spinnerService.hide();
        this.accountInfo = this.rowData.filter(m => {
          if (m.TypeName === 'Real') {
            return m;
          }
        });
        this.leadInfo = this.rowData.filter(p => {
          if (p.TypeName === 'Lead') {
            return p;
          }
        });
      }
    });
  }, 5000);
  }
  userClick(selectedItem: any) {
    localStorage.clear();
    localStorage.setItem('project', JSON.stringify(selectedItem));
    console.log('selecteditem', JSON.stringify(selectedItem));
    this.router.navigateByUrl('/info');
    console.log('Selected item Id: ', selectedItem.ItemId);
  }
  newUser() {
    this.router.navigateByUrl('/user');
  }
  importClients() {
    this.router.navigateByUrl('/importclients');
  }
a: any;
  deletbtn(val) {
    let count = 1;
    if (val === true) {
    this.a = count+1;
  this.showMsg = 'items checked from 4 items';
   this.deletbtnn = false;
} else {
  let count = 1;
  this.a = count--;
  this.showMsg = '';
  this.deletbtnn = true;
}

  }

}
