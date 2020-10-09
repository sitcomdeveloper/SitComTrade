import { Component, OnInit } from '@angular/core';
import { GeneralInfoService } from '../general-info/general-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreatefinancilatransactionsComponent } from './createfinancilatransactions/createfinancilatransactions.component';

@Component({
  selector: 'app-financial-transactions',
  templateUrl: './financial-transactions.component.html',
  styleUrls: ['./financial-transactions.component.css']
})
export class FinancialTransactionsComponent implements OnInit {
  detail: number;
  tketransctionbyclientId: any;
  nofinancialtransctions = false;
  financialtransactionslength: any;
  constructor(private generalinfoService: GeneralInfoService, private _route: ActivatedRoute, private modalService: BsModalService, private router: Router) { }
  bsModalRef: BsModalRef;

  ngOnInit() {
    this.getfinancialtransaction();
  }
  getfinancialtransaction() {
// get trans by id
const details = +this._route.snapshot.paramMap.get('selectedItem');
this.detail = details;
this.generalinfoService.GetfinancialtransactionByClientId(details).subscribe(gettransactioRes => {
  this.tketransctionbyclientId = gettransactioRes.reverse();
  this.financialtransactionslength = gettransactioRes.length;
  if(this.financialtransactionslength === 0) {
    this.nofinancialtransctions = true;
  } else {
    this.nofinancialtransctions = false;
  }
  // console.log('tketransctionbyId', gettransactioRes);
})
  }
  // financial transaction poup
  opencrtfinancialTransactionspopup() {
    const initialState = {
      title: 'Monetary Transaction',
      createfincTransactions:'createfincTransactions',
      id: this.detail,
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(CreatefinancilatransactionsComponent, Object.assign({ show: true }, { class: 'modal-lg', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      // after update refresh all the data
      this.getfinancialtransaction();
    });
  }
  movetoTradeaccountInfo(selectedinfo: any) {
    this.router.navigate(['/trade-info', selectedinfo]);
  }
  movetofinancilatransactionInfo(selectedFinancialTransactons: any) {
    this.router.navigate(['/financial-transactions-info', selectedFinancialTransactons]);
  }
}
