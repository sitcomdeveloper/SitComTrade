import { Component, OnInit, EventEmitter } from '@angular/core';
import { ClientsService } from 'src/app/header/clients/clients.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ItemComponent } from '../item/item.component';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteComponent } from 'src/app/common/delete/delete.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  constructor(private clientService: ClientsService, private modalService: BsModalService, private router: Router, private spinnerService: Ng4LoadingSpinnerService, private route: ActivatedRoute) { }
  bsModalRef: BsModalRef;

  rowData = [];
  deletbtnn = true;
  showMsg: any;
  accountInfo: any[];
  leadInfo: any[];
  clientInfo: any[];
a: any;
UserId: any;
UserLength: any;
Id: any;
msg: string;
pageSize: any;
changePageSize: any;

  ngOnInit() {
    this.userDetails();
  }
  userDetails() {
    this.spinnerService.show();
    setTimeout( () => {
    this.clientService.getUsers(this.clientInfo).subscribe(res => {
      if (res !== null && res !== undefined && res !== '') {
        this.rowData = res.reverse();
        this.UserLength = res.length;
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
  }, 10000);
  }
  refresh(): void {
    window.location.reload();
}
  userClick(selectedItem: any) {
    // let userid = selectedItem;
    // localStorage.clear();
    // localStorage.setItem('project', JSON.stringify(selectedItem));
    // console.log('selecteditem', JSON.stringify(selectedItem));
    // this.router.navigateByUrl('/info');
    // console.log('Selected item Id: ', selectedItem.ItemId);
    console.log(selectedItem);
    this.router.navigate(['/info', selectedItem]);
        // this.router.navigate(['/client-info', userid]);

  }
  newUser() {
    this.router.navigateByUrl('/user');
  }
  importClients() {
    this.router.navigateByUrl('/importclients');
  }
  deletbtn(val, userid) {
    this.UserId = userid;
    const count = 1;
    if (val === true) {
    this.a = count + 1;
    this.showMsg = 'items checked from';
    this.deletbtnn = false;
} else {
  // tslint:disable-next-line: no-shadowed-variable
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

    });
  }
  // delete client
  deleteClient(userid) {
    const initialState = {
      title: 'Delete Item',
      userId: this.UserId,
      // for div close or hide
      rmvClient: 'rmvClient'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(DeleteComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal-lg', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      this.userDetails();
      window.location.reload();
    });
  }

}
