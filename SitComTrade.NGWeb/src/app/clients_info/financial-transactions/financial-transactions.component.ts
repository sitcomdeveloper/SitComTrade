import { Component, OnInit } from '@angular/core';
import { GeneralInfoService } from '../general-info/general-info.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-financial-transactions',
  templateUrl: './financial-transactions.component.html',
  styleUrls: ['./financial-transactions.component.css']
})
export class FinancialTransactionsComponent implements OnInit {
  typeoffinaclTransaction: any;
  addedfincialTransaction: any;
  updatedFinacilTranstion: any;
  tketransctionbyId: any;
  detail: number;

  constructor(private generalinfoService: GeneralInfoService, private _route: ActivatedRoute) { }

  ngOnInit() {
    // get trans by id
    const details = +this._route.snapshot.paramMap.get('selectedItem');
    this.detail = details;
    this.generalinfoService.getfinanciltransbyId(4).subscribe(gettransactioRes => {
      this.tketransctionbyId = gettransactioRes;
      console.log('tketransctionbyId', gettransactioRes);
    })
    this.transactionType();
  }
  // get trans by id
  // getallfinacialtransctionbyId() {
  //   this.generalinfoService.getfinanciltransbyId().subscribe(gettransactioRes => {
  //     this.tketransctionbyId = gettransactioRes;
  //     console.log('tketransctionbyId',gettransactioRes);
  //   })
  // }
  // get transaction type
  transactionType() {
    this.generalinfoService.gettransactiontype().subscribe(transtypeRes => {
      this.typeoffinaclTransaction = transtypeRes;
      console.log('typeoffinaclTransaction', transtypeRes);
    })
  }
  // insrt financial transaction
  addfinacilaTransaction() {
    const insrtfincilTransParamtr = {
      // OwnerId: ,
      // ClientId: ,
      // AccountId: ,
      // TPAccountNumber: ,
      // CurrencyId: ,
      // CurrencyName: ,
      // DepositAmount: ,
      // WithdrawAmount: ,
      // BalanceAmount: ,
      // ItemId: ,
      // TradingEnvironment: ,
      // TransactionTypeId: ,
      // TransactionTypeName: ,
      // TransactionApprovalId: ,
      // TransactionApprovalName: ,
      // FTD: ,
      // Desk: ,
      // Comment: ,
      // ManualAuto: 
    }
    this.generalinfoService.insrtfinancialTrnsion(insrtfincilTransParamtr).subscribe(addfincialtransctionRes => {
      this.addedfincialTransaction = addfincialtransctionRes;
      console.log('addedfincialTransaction', addfincialtransctionRes);
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
}
