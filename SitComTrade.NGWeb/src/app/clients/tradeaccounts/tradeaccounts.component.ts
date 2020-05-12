import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/header/clients/clients.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tradeaccounts',
  templateUrl: './tradeaccounts.component.html',
  styleUrls: ['./tradeaccounts.component.css']
})
export class TradeaccountsComponent implements OnInit {
  tradeInfo: any[];
  fetchTradeDetails: any[];
  tradeAccountLength: any;
  UserId: any;
  a: number;
  Id: any;

  constructor(private clientsservice: ClientsService, private spinnerService: Ng4LoadingSpinnerService,
              private modalService: BsModalService, private router: Router) { }
    bsModalRef: BsModalRef;

  TypeName = 'Real';
	// tslint:disable-next-line: indent
  OwnerId  = 1;
  deletbtnn = true;
  ngOnInit() {
    this.tradeDetails();
  }
  tradeDetails() {
    const obj = {
      TypeName : 'Real',
      OwnerId  : 1
    };
    this.clientsservice.getTradeUsers(obj).subscribe(res => {
      this.spinnerService.show();
      this.fetchTradeDetails = res;
      this.tradeAccountLength = res.length;
      console.log('tradeusers', res);
    });
  }
  deletbtn(val, userid) {
    this.UserId = userid;
    const count = 1;
    if (val === true) {
    this.a = count + 1;
    this.deletbtnn = false;
} else {
  // tslint:disable-next-line: no-shadowed-variable
  let count = 1;
  this.a = count--;
  this.deletbtnn = true;
}
  }
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
      this.tradeDetails();
      // window.location.reload();
    });
  }
  // move data to info page by Id
  moveToInfoPage(selectedItem: any) {
    this.router.navigate(['/info', selectedItem]);
  }
}
