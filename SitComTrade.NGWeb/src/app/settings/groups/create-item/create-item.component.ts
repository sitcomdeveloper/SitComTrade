import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CurrencyService } from 'src/app/services/currency.service';
import { GroupsService } from '../groups.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralInfoService } from 'src/app/clients_info/general-info/general-info.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  newGroupForm: FormGroup;
  currencyName: any;
  getAllCurrency: any;
  newGroup: any;
  response: any;
  submitted = false;
  title: any;
  Leverage: any;
  createGroups = false;
  viewhistoryGroups = false;
  newgroup: string;
  grpviewhistry: string;
  gtviewhist: any;
  getLoginDetails: any;
  bindLoginData: any;
  instrmntsviewhistry: string;
  viewhistoryInstruments = false;
    constructor(private bsmodal: BsModalRef, private currencyService: CurrencyService, private groupService: GroupsService,
                private fb: FormBuilder, private groupsService: GroupsService, private generalinfoservice: GeneralInfoService) { }

  ngOnInit() {
     // code for receiving login details and bind to header at place of name
     this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
     this.bindLoginData = this.getLoginDetails; 
     
    if(this.newgroup === 'newgroup') {
      this.createGroups = true;
    } else {
      this.createGroups = false;
    }
    if(this.grpviewhistry === 'grpviewhistry') {
      this.viewhistoryGroups = true;
      this.generalinfoservice.getviewhistory(this.bindLoginData.UserId).subscribe(res => {
        this.gtviewhist = res;
        // console.log('gtviewhist',res);
      });
    } else {
      this.viewhistoryGroups = false;
    }
    if(this.instrmntsviewhistry === 'instrmntsviewhistry') {
      this.viewhistoryInstruments = true;
      this.generalinfoservice.getviewhistory(this.bindLoginData.UserId).subscribe(res => {
        this.gtviewhist = res;
        // console.log('gtviewhist',res);
      });
    } else {
      this.viewhistoryInstruments = false;
    }
    this.newGroupForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      initialdeposit: ['', [Validators.required]],
      stopout: ['', [Validators.required]],
      margincall: ['', [Validators.required]],
      ordercount: ['', [Validators.required]],
      demo: [''],
      mindeposit: ['', [Validators.required]],
      allowtrade: [''],
      currencyname: ['', [Validators.required]],
      leveragename: ['', [Validators.required]],
      currencyid: [''],
      leverageid: ['']
    });
    this.currency();
    this.getLeverages();
  }
  // get all currency
  currency() {
    this.currencyService.currencyName(this.currencyName).subscribe(res => {
      this.getAllCurrency = res;
      console.log('currency', res);
    });
  }
// add new group
  addGroup() {
    if (this.newGroupForm.valid) {
    this.getAllCurrency.forEach(element => {
      if ( element.Id === +this.newGroupForm.value.currencyname) {
        this.newGroupForm.value.currencyid = element.Name;
      }
    });
    this.Leverage.forEach(element => {
      if ( element.Id === +this.newGroupForm.value.leveragename) {
        this.newGroupForm.value.leverageid = element.Name;
      }
    });
    // for ( let i = 0; i < this.getAllCurrency.length; i++)  {
    //   if (this.getAllCurrency[i].Id === +this.newGroupForm.value.currencyname) {
    //     this.newGroupForm.value.currencyid = this.getAllCurrency[i].Name;
    //   }
    // }
    const obj = {
      Name: this.newGroupForm.value.name,
      Description: this.newGroupForm.value.description,
      InitialDeposit: this.newGroupForm.value.initialdeposit,
      StopOut: this.newGroupForm.value.stopout,
      MarginCall: this.newGroupForm.value.margincall,
      OrderCount: this.newGroupForm.value.ordercount,
      Demo: this.newGroupForm.value.demo,
      MinDeposit: this.newGroupForm.value.mindeposit,
      AllowTrade: this.newGroupForm.value.allowtrade,
      // currency ID
      CurrencyId: this.newGroupForm.value.currencyname,
      // currency name
      CurrencyName: this.newGroupForm.value.currencyid,
      LeverageId: this.newGroupForm.value.leveragename,
      LeverageName: this.newGroupForm.value.leverageid,
      UserId: this.bindLoginData.UserId

    };
    this.groupService.addTradeGroups(obj).subscribe(res => {
      this.newGroup = res;
      this.clddata.emit(res);
      if (res === 'null') {
        this.response = '';
      } else {
        this.response = 'Group is added successfully!';
      }
      this.newGroupForm.reset();
      console.log('newGroup', res);
    });
  } else {
    this.submitted = true;
  }
  }
  get f() {
    return this.newGroupForm.controls;
  }
  hideModal() {
    this.bsmodal.hide();
  }
  // get Leverages
getLeverages() {
  this.groupsService.getAllLverages().subscribe(rspnse => {
    this.Leverage = rspnse;
    // console.log('Leverage', rspnse);
  });
}

}
