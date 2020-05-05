import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupsService } from '../groups.service';
import { FormGroup, FormBuilder } from '@angular/forms';

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
  constructor(private router: Router, private route: ActivatedRoute, private groupService: GroupsService, private fb: FormBuilder) { }

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
  // updateGroupDetails
  updateGroupDetails() {
    const obj = {
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
  console.log('updatedDetails', res);
});
  }

}

