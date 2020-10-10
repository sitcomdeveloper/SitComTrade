import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GeneralInfoService } from '../general-info/general-info.service';

@Component({
  selector: 'app-financial-transactions-info',
  templateUrl: './financial-transactions-info.component.html',
  styleUrls: ['./financial-transactions-info.component.css']
})
export class FinancialTransactionsInfoComponent implements OnInit {
  frontGeneralInfo = true;
  financialtransactionInfoForm: FormGroup;
  frontend = true;
  backend = false;
  idfinacialtrnsctions: number;
  resFT: any;
  typeoffinaclTransaction: any;
  approvaloffinaclTransaction: any;
  updatedFinacilTranstion: any;
  constructor(private fb: FormBuilder, private generalinfoService: GeneralInfoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.financialtransactionInfoForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      itemid: [''],
      accountid: [''],
      tpaccount: [''],
      date: [''],
      tradingenvironment: [''],
      modifieddate: [''],
      transactiontypeid: [''],
      transactiontype: [''],
      manualauto: [''],
      amount: [''],
      paymenttype: [''],
      currencyname: [''],
      orderid: [''],
      complianceapproval: [''],
      transactionapprovalid: [''],
      transactionapproval: [''],
      declinereason: [''],
      transactionid: [''],
      declinereasontext: [''],
      originaltransactiondesk: [''],
      approvedby: [''],
      originaltransactionowner: [''],
      approveddate: [''],
      referencenumber: [''],
      transactionsource: [''],
      receipt: [''],
      ftd: [''],
      afftransaction: [''],
      usdamount: [''],
      reporttedtoaff: [''],
      euramount: [''],
      basecurrencyamount: [''],
      gbpamount: [''],
      transactioncase: [''],
      ewalletaccountid: [''],
      comment: [''],
      owner: [''],
      createdby: [''],
      retentionapproval: [''],
      ignoreinreports: [''],
    })
    const IDofFT = +this.route.snapshot.paramMap.get('selectedFinancialTransactons');
    this.idfinacialtrnsctions = IDofFT;
    this.generalinfoService.GetfinancialtransactionbyID(IDofFT).subscribe(fincialtransidRes => {
      this.resFT = fincialtransidRes;
      this.financialtransactionInfoForm.patchValue({
        firstname: this.resFT.FirstName,
        itemid: this.resFT.ItemId,
        accountid: this.resFT.AccountId,
        tpaccount: this.resFT.TPAccountNumber,
        date: this.resFT.TransactionDate,
        tradingenvironment: this.resFT.TradingEnvironment,
        transactiontype: this.resFT.TransactionTypeName,
        manualauto: this.resFT.ManualAuto,
        amount: this.resFT.DepositAmount,
        currencyname: this.resFT.CurrencyName,
        transactionapproval: this.resFT.TransactionApprovalName,
        originaltransactiondesk: this.resFT.Desk,
        ftd: this.resFT.FTD,
        comment: this.resFT.Comment,
        createdby: this.resFT.CreatedBy,
      })
      // console.log('resFT',fincialtransidRes);
    })
    this.transactionType();
    this.transactionApproval();
  }
  // pencil
  openeditingmode() {
    this.frontend = false;
    this.backend = true;
  }
  // apply
  updtedetailsofFinanciaktransactions() {
    this.typeoffinaclTransaction.forEach(element => {
      if (element.Id === +this.financialtransactionInfoForm.value.transactiontype) {
        this.financialtransactionInfoForm.value.transactiontypeid = element.Name;
      }
    });
    this.approvaloffinaclTransaction.forEach(element => {
      if (element.Id === +this.financialtransactionInfoForm.value.transactionapproval) {
        this.financialtransactionInfoForm.value.transactionapprovalid = element.Name;
      }
    });
    const updtfincilTransParamtr = {
      Id: this.resFT.Id,
      OwnerId: this.resFT.OwnerId,
      ClientId: this.resFT.ClientId,
      AccountId: this.resFT.AccountId,
      TPAccountNumber: this.resFT.TPAccountNumber,
      CurrencyId: this.resFT.CurrencyId,
      CurrencyName: this.resFT.CurrencyName,
      DepositAmount: this.financialtransactionInfoForm.value.amount,
      WithdrawAmount:this.resFT.WithdrawAmount,
      BalanceAmount: this.resFT.BalanceAmount,
      ItemId: this.resFT.ItemId,
      TradingEnvironment: this.resFT.TradingEnvironment,
      TransactionTypeId: this.financialtransactionInfoForm.value.transactiontypeid,
      TransactionTypeName: this.financialtransactionInfoForm.value.transactiontype,
      TransactionApprovalId: this.financialtransactionInfoForm.value.transactionapprovalid,
      TransactionApprovalName: this.financialtransactionInfoForm.value.transactionapproval,
      FTD: this.financialtransactionInfoForm.value.ftd,
      Desk: this.resFT.Desk,
      Comment: this.financialtransactionInfoForm.value.comment,
      ManualAuto: this.financialtransactionInfoForm.value.manualauto
    }
    this.generalinfoService.updtfinancialTrnsion(updtfincilTransParamtr).subscribe(updtFinTrnsRes => {
      this.updatedFinacilTranstion = updtFinTrnsRes;
      this.afterupdate();
      // console.log('updatedFinacilTranstion', updtFinTrnsRes);
    })
    this.frontend = true;
    this.backend = false;
  }
  afterupdate() {
    const IDofFT = +this.route.snapshot.paramMap.get('selectedFinancialTransactons');
    this.idfinacialtrnsctions = IDofFT;
    this.generalinfoService.GetfinancialtransactionbyID(IDofFT).subscribe(fincialtransidRes => {
      this.resFT = fincialtransidRes;
    })
  }
  // cancel
  backtofrontmode() {
    this.frontend = true;
    this.backend = false;
  }
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
}