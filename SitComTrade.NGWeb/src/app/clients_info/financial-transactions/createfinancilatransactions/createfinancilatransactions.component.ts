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
  userinfo: any;
  constructor(private fb: FormBuilder, private bsModalRef: BsModalRef, private route: ActivatedRoute, private generalinfoService: GeneralInfoService) { }

  ngOnInit() {
    this.generalinfoService.GetTradeAccountListByClientId(this.id).subscribe(res => {
      this.userinfo = res;
      // console.log('prob',res);
    });
 
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
    this.transactionType();
    this.transactionApproval();
  }
  hideModal() {
    this.bsModalRef.hide();
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
    ClientId: this.id,
    AccountId: '',
    TPAccountNumber: this.taskInfoForm.value.tpaccount,
    CurrencyId: '',
    CurrencyName: '',
    DepositAmount: '',
    WithdrawAmount: '',
    BalanceAmount: this.taskInfoForm.value.amount,
    ItemId: '',
    TradingEnvironment: 'Real',
    TransactionTypeId: this.taskInfoForm.value.transactiontype,
    TransactionTypeName: this.taskInfoForm.value.transactiontypeid,
    TransactionApprovalId: this.taskInfoForm.value.transactionapproval,
    TransactionApprovalName: this.taskInfoForm.value.transactionapprovalid,
    FTD: '',
    Desk: '',
    Comment: this.taskInfoForm.value.comment,
    ManualAuto: ''
  }
  this.generalinfoService.insrtfinancialTrnsion(insrtfincilTransParamtr).subscribe(addfincialtransctionRes => {
    this.addedfincialTransaction = addfincialtransctionRes;
    this.clddata.emit(addfincialtransctionRes);
  this.hideModal();
    // console.log('addedfincialTransaction', addfincialtransctionRes);
  })
}
}
