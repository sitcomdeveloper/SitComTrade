import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Instruments } from '../settingsDTO';
import * as $ from 'jquery'

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

  constructor(private settingsService: SettingsService) { }

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
    console.log('tkeInstruments', getinstrumnts);
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
}
