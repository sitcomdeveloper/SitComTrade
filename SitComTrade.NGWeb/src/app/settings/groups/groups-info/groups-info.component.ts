import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupsService } from '../groups.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-groups-info',
  templateUrl: './groups-info.component.html',
  styleUrls: ['./groups-info.component.css']
})
export class GroupsInfoComponent implements OnInit {
  info: number;
  groupDetails: any;
  frontend = true;
  backend = false;
  groupsinfoForm: FormGroup;
  updatedDetails: any;
  getGroupsData: any;
  Group: any;
  getAllCurrency: any;
  currencies: any;
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private route: ActivatedRoute, private groupService: GroupsService, private fb: FormBuilder, private spinnerService: Ng4LoadingSpinnerService,
    private currencyService: CurrencyService) { }

  ngOnInit() {
    this.groupsinfoForm = this.fb.group({
      names: [''],
      initialdeposit: [''],
      margincall: [''],
      ordercount: [''],
      currency: [''],
      demo: [''],
      stopout: [''],
      allowtrade: [''],
      description: [''],
      leverage: [''],
      mindeposit: ['']
    });
    // for getting data for general-info
    const info = +this.route.snapshot.paramMap.get('setItem');
    console.log(info);
    this.groupService.getGroupDetails(info).subscribe(res => {
      this.groupDetails = res;
      console.log('groupDetails', res);
      this.groupsinfoForm.patchValue({
        names: this.groupDetails.Name,
        initialdeposit: this.groupDetails.InitialDeposit,
        margincall: this.groupDetails.MarginCall,
        ordercount: this.groupDetails.OrderCount,
        currency: this.groupDetails.CurrencyName,
        demo: this.groupDetails.Demo,
        stopout: this.groupDetails.StopOut,
        allowtrade: this.groupDetails.AllowTrade,
      description: this.groupDetails.Description,
      leverage: this.groupDetails.LeverageName,
      mindeposit: this.groupDetails.MinDeposit

    });
    });
    this.currency();
  }
  // hide front div and show back div(by click on pencil)
  hideshow() {
    this.frontend = false;
    this.backend = true;
  }
  // back to front div by click on cancel
  closehideshow() {
    this.frontend = true;
    this.backend = false;
  }
  currency() {
    this.currencyService.currencyName(this.currencies).subscribe(res => {
      this.getAllCurrency = res;
      console.log('currency', res);
    });
  }
  getGroups() {
    this.groupService.getTradeGroups(this.getGroupsData).subscribe(result => {
      this.Group = result.reverse();
      console.log('getGroup', result);
    });
   }
  // updateGroupDetails
  updateGroupDetails() {
    const obj = {
      Id: this.groupDetails.Id,
      Name: this.groupsinfoForm.value.names,
      Description: this.groupsinfoForm.value.description,
      InitialDeposit: this.groupsinfoForm.value.initialdeposit,
      StopOut: this.groupsinfoForm.value.stopout,
      MarginCall: this.groupsinfoForm.value.margincall,
      OrderCount: this.groupsinfoForm.value.ordercount,
      Demo: this.groupsinfoForm.value.demo,
      MinDeposit: this.groupsinfoForm.value.mindeposit,
      AllowTrade: this.groupsinfoForm.value.allowtrade,
      CurrencyId: 1,
      CurrencyName: this.groupsinfoForm.value.currency,
      LeverageId: 1,
      LeverageName: this.groupsinfoForm.value.leverage
    };
    this.groupService.updateGroup(obj).subscribe(res => {
  this.updatedDetails = res;
  this.getGroups();
  this.frontend = true;
  this.backend = false;
  
  this.spinnerService.show();
  console.log('updatedDetails', res);
});
  }

}

