import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GeneralInfoService } from '../../general-info/general-info.service';
@Component({
  selector: 'app-createfinancilatransactions',
  templateUrl: './createfinancilatransactions.component.html',
  styleUrls: ['./createfinancilatransactions.component.css']
})
export class CreatefinancilatransactionsComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  taskInfoForm: FormGroup
  typeoffinaclTransaction: any;
  approvaloffinaclTransaction: any;
  detail: number;
  userGenralinfo: any;
  addedfincialTransaction: any;
  id: number;
  tketransctionbyclientId: any;
  constructor(private fb: FormBuilder, private bsModalRef: BsModalRef, private route: ActivatedRoute, private generalinfoService: GeneralInfoService) { }

  ngOnInit() {
  //   const details = +this.route.snapshot.paramMap.get('selectedItem');
  // this.detail = details;
 
    this.taskInfoForm = this.fb.group({
      // crt financial transaction
      tpaccount: [''],
      amount: [''],
      transactiontypeid: [''],
      transactiontype: [''],
      transactionapprovalid: [''],
      transactionapproval: [''],
      comment: [''],
});
this.gettransactionbyclientid();
    this.transactionType();
    this.transactionApproval();
  }
  hideModal() {
    this.bsModalRef.hide();
  }
  gettransactionbyclientid() {
    this.generalinfoService.GetfinancialtransactionByClientId(this.id).subscribe(gettransactioRes => {
      this.tketransctionbyclientId = gettransactioRes;
      console.log('tketransctionbyId', gettransactioRes);
    })
  }
  // finacial transaction
 // get transaction type
 transactionType() {
  this.generalinfoService.gettransactiontype().subscribe(transtypeRes => {
    this.typeoffinaclTransaction = transtypeRes;
    // console.log('typeoffinaclTransaction', transtypeRes);
  })
}
// get transaction approval
transactionApproval() {
  this.generalinfoService.gettransactionapproval().subscribe(transapprovalRes => {
    this.approvaloffinaclTransaction = transapprovalRes;
    // console.log('approvaloffinaclTransaction', transapprovalRes);
  })
}
// insrt financial transaction
addfinacilaTransaction() { 
  this.typeoffinaclTransaction.forEach(element => {
    if (element.Id === +this.taskInfoForm.value.transactiontype) {
      this.taskInfoForm.value.transactiontypeid = element.Name;
    }
  });
  this.approvaloffinaclTransaction.forEach(element => {
    if (element.Id === +this.taskInfoForm.value.transactionapproval) {
      this.taskInfoForm.value.transactionapprovalid = element.Name;
    }
  });
  
  const insrtfincilTransParamtr = {
    OwnerId: 4,
    ClientId: this.tketransctionbyclientId.ClientId,
    AccountId: this.tketransctionbyclientId.AccountId,
    TPAccountNumber: this.tketransctionbyclientId.TPAccountNumber,
    CurrencyId: this.tketransctionbyclientId.CurrencyId,
    CurrencyName: this.tketransctionbyclientId.CurrencyName,
    DepositAmount: this.tketransctionbyclientId.TotalDeposit,
    WithdrawAmount: this.tketransctionbyclientId.TotalWithdrawal,
    BalanceAmount: this.tketransctionbyclientId.NetDeposit,
    ItemId: this.tketransctionbyclientId.TPAccountNumber,
    TradingEnvironment: 'Real',
    TransactionTypeId: this.taskInfoForm.value.transactiontype,
    TransactionTypeName: this.taskInfoForm.value.transactiontypeid,
    TransactionApprovalId: this.taskInfoForm.value.transactionapproval,
    TransactionApprovalName: this.taskInfoForm.value.transactionapprovalid,
    FTD: this.tketransctionbyclientId.FTD,
    Desk: this.tketransctionbyclientId.Desk,
    Comment: this.taskInfoForm.value.comment,
    ManualAuto: ''
  }
  this.generalinfoService.insrtfinancialTrnsion(insrtfincilTransParamtr).subscribe(addfincialtransctionRes => {
    this.addedfincialTransaction = addfincialtransctionRes;
    this.clddata.emit(addfincialtransctionRes);
  this.hideModal();
    console.log('addedfincialTransaction', addfincialtransctionRes);
  })
}
}
