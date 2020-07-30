import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from 'src/app/settings/groups/groups.service';
import { ClientsService } from 'src/app/header/clients/clients.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-live-detail',
  templateUrl: './live-detail.component.html',
  styleUrls: ['./live-detail.component.css']
})
export class LiveDetailComponent implements OnInit {
  tradedetail: number;
  editMode = false;
  normalMode = true;
  groupDetails: any;
  realTradeUsers: any;
  Leverage: any;
  tradeaccountInfoForm: FormGroup
  updtaeddetails: any;

  constructor(private route: ActivatedRoute, private groupService: GroupsService, private clientsservice: ClientsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.tradeaccountInfoForm = this.fb.group({
      status: [''],
      leveragename: [''],
      groupname: [''],
      stopout: [''],
      margincall: [''],
      mindeposit: [''],
    })
    // for getting data on frame
    const tradedetails = +this.route.snapshot.paramMap.get('trdingDtls');
    this.tradedetail = tradedetails;
    this.clientsservice.getTradeAccountdetailsbyId(tradedetails).subscribe(trdeusersDetails => {
      this.realTradeUsers = trdeusersDetails;
      // console.log('realTradeUsers', trdeusersDetails);
      this.tradeaccountInfoForm.patchValue({
        groupname: this.realTradeUsers.GroupName,
        leveragename: this.realTradeUsers.LeverageName,
        margincall: this.realTradeUsers.MarginCall,
        stopout: this.realTradeUsers.StopOut,
        mindeposit: this.realTradeUsers.MinDeposit,
       // status: this.realTradeUsers.,
      })
     });
     this.getLeverages();
  }
  // pencil
  showhide() {  
    this.normalMode = false;
    this.editMode = true;
  }
  // Apply
  closeshowhide() {
    const modifyTradeAccount = {
      Id: this.realTradeUsers.Id,
      TPAccountNumber: this.realTradeUsers.TPAccountNumber,
      FTD: this.realTradeUsers.FTD,
      FTDDate: this.realTradeUsers.FTDDate,
      FtdAmount: this.realTradeUsers.FtdAmount,
      LastTradeDate: this.realTradeUsers.LastTradeDate,
      LastDepositDate: this.realTradeUsers.LastDepositDate,
      GroupId: this.realTradeUsers.GroupId,
      GroupName: this.realTradeUsers.GroupName,
      ISendEmail: this.realTradeUsers.ISendEmail,
      CurrencyId: this.realTradeUsers.CurrencyId,
      CurrencyName: this.realTradeUsers.CurrencyName,
      InitialDeposit: this.realTradeUsers.InitialDeposit,
      StopOut: this.tradeaccountInfoForm.value.stopout,
      MarginCall: this.tradeaccountInfoForm.value.margincall,
      OrderCount: this.realTradeUsers.OrderCount,
      MinDeposit: this.tradeaccountInfoForm.value.mindeposit,
      CloseProfit: this.realTradeUsers.CloseProfit,
      CloseLoss: this.realTradeUsers.CloseLoss,
      TotalDeposit: this.realTradeUsers.TotalDeposit,
      TotalWithdrawal: this.realTradeUsers.TotalWithdrawal,
      NetDeposit: this.realTradeUsers.NetDeposit,
      OpenProfit: this.realTradeUsers.OpenProfit,
      OpenLoss: this.realTradeUsers.OpenLoss,
      Commission: this.realTradeUsers.Commission,
      Equity: this.realTradeUsers.Equity,
      Balance: this.realTradeUsers.Balance,
      MarginLevel: this.realTradeUsers.MarginLevel,
      FreeMargin: this.realTradeUsers.FreeMargin,
      Credit: this.realTradeUsers.Credit,
      Volume: this.realTradeUsers.Volume,
      AllowTrade: this.realTradeUsers.AllowTrade,
      DepositCount: this.realTradeUsers.DepositCount,
      UserId: this.realTradeUsers.UserId,
      ClientId: this.realTradeUsers.ClientId,
      AccountId: this.realTradeUsers.AccountId,
    }
    this.clientsservice.updtTradeAccount(modifyTradeAccount).subscribe(updtedtradeAccount => {
      this.updtaeddetails = updtedtradeAccount;
      // console.log('updtaeddetails', updtedtradeAccount);
      this.afterupdate();
    })
    this.normalMode = true;
    this.editMode = false;
  }
  afterupdate() {
    this.clientsservice.getTradeAccountdetailsbyId( this.tradedetail).subscribe(trdeusersDetails => {
      this.realTradeUsers = trdeusersDetails;
  })
}
  // cancel
  cancel() {
    this.normalMode = true;
    this.editMode = false;
  }
  // get all leverages
  getLeverages() {
    this.groupService.getAllLverages().subscribe(rspnse => {
      this.Leverage = rspnse;
    });
  }
}

