import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/header/clients/clients.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ItemComponent } from '../item/item.component';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  constructor(private clientService: ClientsService, private modalService: BsModalService, private router: Router, private spinnerService: Ng4LoadingSpinnerService) { }
  bsModalRef: BsModalRef;

  rowData = [];
  deletbtnn = true;
  showMsg: any;
  accountInfo: any[];
  leadInfo: any[];
  clientInfo: any[];
a: any;

  ngOnInit() {
    this.userDetails();
    // this.accountData();
    // this.leadData();
  }
  userDetails() {
    this.spinnerService.show();
    setTimeout( () => {
    this.clientService.getUsers(this.clientInfo).subscribe(res => {
      if (res !== null && res !== undefined && res !== '') {
        this.rowData = res;
        let totalItems = res.length;
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
  // accountData() {
  //   this.clientService.getUsers(this.clientInfo).subscribe(res => {
  //     if (res !== null && res !== undefined && res !== '') {
  //       this.rowData = res.reverse();
  //       this.accountInfo = this.rowData.filter(m => {
  //     if (m.TypeName === 'Real') {
  //       return m;
  //     }
  //   });
  // }
  // });
  // }
//   leadData() {
//     this.clientService.getUsers(this.clientInfo).subscribe(res => {
//       if (res !== null && res !== undefined && res !== '') {
//         this.rowData = res.reverse();
//         this.leadInfo = this.rowData.filter(p => {
//       if (p.TypeName === 'Lead') {
//         return p;
//       }
//     });
//   }
// });
//   }
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
  deletbtn(val) {
    const count = 1;
    if (val === true) {
    this.a = count + 1;
    this.showMsg = 'items checked from 4 items';
    this.deletbtnn = false;
} else {
  let count = 1;
  this.a = count--;
  this.showMsg = '';
  this.deletbtnn = true;
}

  }
  // part of add new client modal
  newClient() {
    const initialState = {
      title: 'Create Item',
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(ItemComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal-lg', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      this.userDetails();
      // this.accountData();
      // this.leadData();
    });
  }
  // delete client
  deleteClient() {
    this.clientService.dltClient(obj).subscribe(res => {
      this.dltclientRes = res;
      console.log('dltclientRes', res);
    })
  }

}
