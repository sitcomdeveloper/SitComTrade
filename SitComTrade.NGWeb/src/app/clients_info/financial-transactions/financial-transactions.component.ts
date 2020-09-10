import { Component, OnInit } from '@angular/core';
import { GeneralInfoService } from '../general-info/general-info.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateTaskComponent } from '../tasks-info/create-task/create-task.component';

@Component({
  selector: 'app-financial-transactions',
  templateUrl: './financial-transactions.component.html',
  styleUrls: ['./financial-transactions.component.css']
})
export class FinancialTransactionsComponent implements OnInit {
  updatedFinacilTranstion: any;
  tketransctionbyId: any;
  detail: number;

  constructor(private generalinfoService: GeneralInfoService, private _route: ActivatedRoute, private modalService: BsModalService) { }
  bsModalRef: BsModalRef;

  ngOnInit() {
    // get trans by id
    const details = +this._route.snapshot.paramMap.get('selectedItem');
    this.detail = details;
    this.generalinfoService.getfinanciltransbyId(4).subscribe(gettransactioRes => {
      this.tketransctionbyId = gettransactioRes;
      console.log('tketransctionbyId', gettransactioRes);
    })
  }
  // updt finacial trns
  modifyFinancilTrans() {
    const updtfincilTransParamtr = {
      Id: (4),
OwnerId: (1),
ClientId: (1),
AccountId: (2),
TPAccountNumber: ('ty6777733443'),
CurrencyId: (2),
CurrencyName: ('USD'),
DepositAmount: (10999),
WithdrawAmount: (498),
BalanceAmount: (5654),
ItemId: ('yrd'),
TradingEnvironment: ('Real'),
TransactionTypeId: (1),
TransactionTypeName: ('Deposit'),
TransactionApprovalId: (2),
TransactionApprovalName: ('Paid'),
FTD: (1),
Desk: ('Meeting'),
Comment: ('dhdh jddf'),
ManualAuto: ('JHss')
    }
    this.generalinfoService.updtfinancialTrnsion(updtfincilTransParamtr).subscribe(updtFinTrnsRes => {
      this.updatedFinacilTranstion = updtFinTrnsRes;
      console.log('updatedFinacilTranstion', updtFinTrnsRes);
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
    this.bsModalRef = this.modalService.show(CreateTaskComponent, Object.assign({ show: true }, { class: 'modal-lg', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      // after update refresh all the data
      // this.getAllTask();
    });
  }
}
