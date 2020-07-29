import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/header/clients/clients.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tradeaccount-info',
  templateUrl: './tradeaccount-info.component.html',
  styleUrls: ['./tradeaccount-info.component.css']
})
export class TradeaccountInfoComponent implements OnInit {
  realTradeUsers: any;
  assigntradeaccountdetails: number;
  frontmode = true;
  backmode = false;
  tradeaccountInfoForm: FormGroup
  updtaeddetails: any;
  constructor(private clientsService: ClientsService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.tradeaccountInfoForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      tpaccount: [''],
      groupname: [''],
      leveragename: [''],
      margincall: [''],
      stopout: [''],
      ordercount: [''],
      mindeposit: [''],
      accountid: [''],
      allowtrade: [''],
      registrationdate: [''],
      closeprofitandloss: [''],
      totaldeposits: [''],
      totalwithdrawals: [''],
      netdeposits: [''],
      openprofitandloss: [''],
      commission: [''],
      equity: [''],
      balance: [''],
      marginlevel: [''],
      freemargin: [''],
      credit: [''],
      volume: [''],
      lastlogindate: [''],
      lasttradedate: [''],
      isonline: [''],
      demo: [''],
      owner: [''],
      disabled: [''],
      lastdepositdate: [''],
      convertionowner: [''],
      ftddate: [''],
      ftdamount: [''],
      email: [''],
      phone: [''],
      currency: [''],
      depositcount: [''],
      desk: [''],
      tag: [''],
      status: [''],
    })
    // receiving data from trade account page for trade acc. general-info
    const tradeaccountdetails = +this.route.snapshot.paramMap.get('selectedinfo');
    this.assigntradeaccountdetails = tradeaccountdetails;
    this.clientsService.getTradeAccountdetailsbyId(tradeaccountdetails).subscribe(trdeusersDetails => {
      this.realTradeUsers = trdeusersDetails;
      console.log('realTradeUsers', trdeusersDetails);
      this.tradeaccountInfoForm.patchValue({
        firstname: this.realTradeUsers.FirstName,
        lastname: this.realTradeUsers.LastName,
        tpaccount: this.realTradeUsers.TPAccountNumber,
        groupname: this.realTradeUsers.GroupName,
        leveragename: this.realTradeUsers.LeverageName,
        margincall: this.realTradeUsers.MarginCall,
        stopout: this.realTradeUsers.StopOut,
        ordercount: this.realTradeUsers.OrderCount,
        mindeposit: this.realTradeUsers.MinDeposit,
        accountid: this.realTradeUsers.AccountId,
        allowtrade: this.realTradeUsers.AllowTrade,
        registrationdate: this.realTradeUsers.FirstRegistrationDate,
        closeprofitandloss: this.realTradeUsers.CloseLoss,
        totaldeposits: this.realTradeUsers.TotalDeposit,
        totalwithdrawals: this.realTradeUsers.TotalWithdrawal,
        netdeposits: this.realTradeUsers.NetDeposit,
        openprofitandloss: this.realTradeUsers.OpenProfit,
        commission: this.realTradeUsers.Commission,
        equity: this.realTradeUsers.Equity,
        balance: this.realTradeUsers.Balance,
        marginlevel: this.realTradeUsers.MarginLevel,
        freemargin: this.realTradeUsers.FreeMargin,
        credit: this.realTradeUsers.Credit,
        volume: this.realTradeUsers.Volume,
        // lastlogindate: this.realTradeUsers.,
        lasttradedate: this.realTradeUsers.LastTradeDate,
        // isonline: this.realTradeUsers.,
        // demo: this.realTradeUsers.,
        // owner: this.realTradeUsers.,
        // disabled: this.realTradeUsers.,
        lastdepositdate: this.realTradeUsers.LastDepositDate,
        convertionowner: this.realTradeUsers.ConvertionOwner,
        ftddate: this.realTradeUsers.FTDDate,
        ftdamount: this.realTradeUsers.FtdAmount,
        email: this.realTradeUsers.Email,
        phone: this.realTradeUsers.Phone,
        currency: this.realTradeUsers.CurrencyName,
        depositcount: this.realTradeUsers.DepositCount,
        desk: this.realTradeUsers.Desk,
        // tag: this.realTradeUsers.,
        // status: this.realTradeUsers.,
      })
    })

  }
  // pencil
  openeditingmode() {
    this.backmode = true;
    this.frontmode = false;
  }
  // cancel button
  closeeditingmode() {
    this.frontmode = true;
    this.backmode = false;
  }
  // apply button
  saveupdteDetails() {
    this.frontmode = true;
    this.backmode = false;
    const modifyTradeAccount = {
      // Id: this.realTradeUsers.Id,
      // TPAccountNumber: this.realTradeUsers.TPAccountNumber,
      // FTD: this.tradeaccountInfoForm.value.,
      // FTDDate: this.tradeaccountInfoForm.value.,
      // FtdAmount: this.tradeaccountInfoForm.value.,
      // LastTradeDate: this.tradeaccountInfoForm.value.,
      // LastDepositDate: this.tradeaccountInfoForm.value.,
      // GroupId: this.tradeaccountInfoForm.value.,
      // GroupName: this.realTradeUsers.GroupName,
      // ISendEmail: this.tradeaccountInfoForm.value.,
      // CurrencyId: this.tradeaccountInfoForm.value.,
      // CurrencyName: this.tradeaccountInfoForm.value.,
      // InitialDeposit: this.tradeaccountInfoForm.value.,
      // StopOut: this.tradeaccountInfoForm.value.stopout,
      // MarginCall: this.tradeaccountInfoForm.value.margincall,
      // OrderCount: this.tradeaccountInfoForm.value.ordercount,
      // MinDeposit: this.tradeaccountInfoForm.value.mindeposit,
      // CloseProfit: this.realTradeUsers.CloseProfit,
      // CloseLoss: this.realTradeUsers.CloseLoss,
      // TotalDeposit: this.realTradeUsers.TotalDeposit,
      // TotalWithdrawal: this.realTradeUsers.TotalWithdrawal,
      // NetDeposit: this.realTradeUsers.NetDeposit,
      // OpenProfit: this.realTradeUsers.OpenProfit,
      // OpenLoss: this.realTradeUsers.OpenLoss,
      // Commission: this.tradeaccountInfoForm.value.,
      // Equity: this.tradeaccountInfoForm.value.,
      // Balance: this.tradeaccountInfoForm.value.,
      // MarginLevel: this.tradeaccountInfoForm.value.,
      // FreeMargin: this.tradeaccountInfoForm.value.,
      // Credit: this.tradeaccountInfoForm.value.,
      // Volume: this.tradeaccountInfoForm.value.,
      // AllowTrade: this.tradeaccountInfoForm.value.allowtrade,
      // DepositCount: this.tradeaccountInfoForm.value.,
      // UserId: this.tradeaccountInfoForm.value.,
      // ClientId: this.tradeaccountInfoForm.value.,
      // AccountId: this.realTradeUsers.AccountId,
    }
    this.clientsService.updtTradeAccount(modifyTradeAccount).subscribe(updtedtradeAccount => {
      this.updtaeddetails = updtedtradeAccount;
      console.log('updtaeddetails', updtedtradeAccount);
    })
  }
}

// firstname
//       lastname
//       tpaccount
//       groupname
//       leveragename
//       margincall
//       stopout
//       ordercount
//       mindeposit
//       accountid
//       allowtrade
//       registrationdate
//       closeprofitandloss
//       totaldeposits
//       totalwithdrawals
//       netdeposits
//       openprofitandloss
//       commission
//       equity
//       balance
//       marginlevel
//       freemargin
//       credit
//       volume
//       lastlogindate
//       lasttradedate
//       isonline
//       demo
//       owner
//       disabled
//       lastdepositdate
//       convertionowner
//       ftddate
//       ftdamount
//       phone
//       currency
//       depositcount
//       desk
//       tag
//       status
