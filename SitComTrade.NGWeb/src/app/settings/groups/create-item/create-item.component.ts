import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CurrencyService } from 'src/app/services/currency.service';
import { GroupsService } from '../groups.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    constructor(private bsmodal: BsModalRef, private currencyService: CurrencyService, private groupService: GroupsService,
                private fb: FormBuilder) { }

  ngOnInit() {
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
    // this.getAllCurrency.forEach(element => {
    //   if ( element.Id === +this.newGroupForm.value.currencyname) {
    //     this.newGroupForm.value.currencyid = element.Name;
    //   }
    // });
    for ( let i = 0; i < this.getAllCurrency.length; i++)  {
      if (this.getAllCurrency[i].Id === +this.newGroupForm.value.currencyname) {
        this.newGroupForm.value.currencyid = this.getAllCurrency[i].Name;
      }
    }
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
      CurrencyId: 1,
      CurrencyName: this.newGroupForm.value.currencyname,
      LeverageId: 1,
      LeverageName: this.newGroupForm.value.leveragename

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

}
