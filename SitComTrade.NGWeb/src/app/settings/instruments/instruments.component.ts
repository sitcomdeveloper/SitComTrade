import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { InstrumentsDTO } from '../settingsDTO';
import * as $ from 'jquery'
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateInstrumentsComponent } from './create-instruments/create-instruments.component';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent implements OnInit {
  tkeInstruments: InstrumentsDTO[];
  gtintrumnts: InstrumentsDTO;
  deletbtnn = true;
  UserId: any;
  instrumentslength: any;
  selectedchkbxfrdltinstrmnts = [];
  constructor(private settingsService: SettingsService, private modalService: BsModalService, private router: Router) { }
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
    // $.each(getinstrumnts,function(i,j){
    //   this.tkeInstruments.push(j);
    // });
    this.tkeInstruments = getinstrumnts;
    
    this.instrumentslength = this.tkeInstruments.length;
     console.log('tkeInstruments', this.tkeInstruments.length);
  })
}
createInstruments() {
  const initialState = {
    title: 'Create Item',
    crtinstrumnts: 'crtinstrumnts'
  };
  // tslint:disable-next-line: max-line-length
  this.bsModalRef = this.modalService.show(CreateInstrumentsComponent, Object.assign({  show: true }, { class: 'modal870', initialState }));
  this.bsModalRef.content.closeBtnName = 'Cancel';
  this.bsModalRef.content.clddata.subscribe(() => {
    this.gtallInstruments();
  });
}
editInstruemnts(slctedinstrumentsdta) {
  const initialState = {
    title: 'Edit Item',
    edtinstrmnts: 'edtinstrmnts',
    selectedrowdta: slctedinstrumentsdta
  };
  // tslint:disable-next-line: max-line-length
  this.bsModalRef = this.modalService.show(CreateInstrumentsComponent, Object.assign({  show: true }, { class: 'modal870', initialState }));
  this.bsModalRef.content.closeBtnName = 'Cancel';
  this.bsModalRef.content.clddata.subscribe(() => {
    this.gtallInstruments();
  });
}
deletbtn(val, userid) {
  this.UserId = userid
  if (val === true) {
    this.deletbtnn = false;
 this.selectedchkbxfrdltinstrmnts.push(userid);
  } else {
    this.deletbtnn = true;
   this.selectedchkbxfrdltinstrmnts.splice(this.selectedchkbxfrdltinstrmnts.indexOf(userid), 1)
  }
}
opendltinstruments() {
  const initialState = {
    title: 'Delete Group',
    selectedinstrumentswilldltd: this.selectedchkbxfrdltinstrmnts,
    // for div close or hide
    rmvInstruments: 'rmvInstruments' 
  };
  // tslint:disable-next-line: max-line-length
  this.bsModalRef = this.modalService.show(DeleteComponent, Object.assign({ show: true }, { class: 'modal450', initialState }));
  this.bsModalRef.content.closeBtnName = 'Cancel';
  this.bsModalRef.content.clddata.subscribe(data => {
    this.gtallInstruments();
  });
}
opengeneralinfo(setItem: any) {
  this.router.navigate(['/groups-info', setItem,2]);
}
}
// instrumentsId
