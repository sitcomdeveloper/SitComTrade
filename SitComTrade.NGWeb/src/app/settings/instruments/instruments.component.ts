import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Instruments } from '../settingsDTO';
import * as $ from 'jquery'
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateInstrumentsComponent } from './create-instruments/create-instruments.component';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent implements OnInit {
  tkeInstruments: Instruments;
  gtintrumnts: Instruments;
  deletbtnn = true;
  UserId: any;
  instrumentslength: any;

  constructor(private settingsService: SettingsService, private modalService: BsModalService) { }
  bsModalRef: BsModalRef;
  ngOnInit() {
    // code for receiving login details and bind to owner name at place of name
    // this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    // this.bindLoginData = this.getLoginDetails;
    $(document).ready(function () {
      $("#ckbCheckAll").click(function () {
          $(".checkBoxClass").prop('checked', $(this).prop('checked'));
          var chlength = $('.checkBoxClass:checked').length;
        $("#chked").html("<span>"+chlength+ " items checked from</span>");
      });
    })

    this.gtallInstruments();
  }
gtallInstruments() {
  this.settingsService.getInstruments(this.gtintrumnts).subscribe(getinstrumnts => {
    this.tkeInstruments = getinstrumnts;
    // this.instrumentslength = this.tkeInstruments.length;
    // console.log('tkeInstruments', getinstrumnts);
  })
}
deletbtn(val, userid) {
  this.UserId = userid
  if (val === true) {
    this.deletbtnn = false;
//  this.selectedchkbxfrdltgrp.push(userid);
  } else {
    this.deletbtnn = true;
  //  this.selectedchkbxfrdltgrp.splice(this.selectedchkbxfrdltgrp.indexOf(userid), 1)
  }
}
createInstruments() {
  const initialState = {
    title: 'Create Item',
    crtinstrumnts: 'crtinstrumnts'
  };
  // tslint:disable-next-line: max-line-length
  this.bsModalRef = this.modalService.show(CreateInstrumentsComponent, Object.assign({  show: true }, { class: 'modal450', initialState }));
  this.bsModalRef.content.closeBtnName = 'Cancel';
  // this.bsModalRef.content.clddata.subscribe(() => {
  //   this.userDetails();
  // });
}
editInstruemnts() {
  const initialState = {
    title: 'Edit Item',
    edtinstrmnts: 'edtinstrmnts'
  };
  // tslint:disable-next-line: max-line-length
  this.bsModalRef = this.modalService.show(CreateInstrumentsComponent, Object.assign({  show: true }, { class: 'modal450', initialState }));
  this.bsModalRef.content.closeBtnName = 'Cancel';
  // this.bsModalRef.content.clddata.subscribe(() => {
  //   this.userDetails();
  // });
}
}
