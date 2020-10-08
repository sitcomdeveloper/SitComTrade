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
      transactiontype: [''],
      manualauto: [''],
      amount: [''],
      paymenttype: [''],
      currencyname: [''],
      orderid: [''],
      complianceapproval: [''],
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
      console.log('resFT',fincialtransidRes);
    })
  }

}
