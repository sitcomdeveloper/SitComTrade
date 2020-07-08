import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { IpDTO } from '../settingsDTO';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateEditWoorkflowsComponent } from '../workflows/create-edit-woorkflows/create-edit-woorkflows.component';
import * as $ from 'jquery'
import { DeleteComponent } from 'src/app/common/delete/delete.component';

@Component({
  selector: 'app-iplist',
  templateUrl: './iplist.component.html',
  styleUrls: ['./iplist.component.css']
})
export class IplistComponent implements OnInit {
  getallIp: any;
  IP: any;
  crtnewIp: IpDTO;
  newip: IpDTO;
  IPForm: FormGroup
  getLoginDetails: any;
  bindLoginData: any;
  IPlength: any;
  UserId: any;
  deletbtnn = true;
  selectedchkbxfrdltIP = [];
  constructor(private settingsService: SettingsService, private fb: FormBuilder, private modalService: BsModalService) { }
  bsModalRef: BsModalRef;

  ngOnInit() {
    $(document).ready(function () {
      $("#ckbCheckAll").click(function () {
        $(".checkBoxClass").prop('checked', $(this).prop('checked'));
        var chlength = $('.checkBoxClass:checked').length;
        $("#chked").html("<span>" + chlength + " items checked from</span>");
      });
    }); 
    this.IPForm = this.fb.group({
      ip: [''],
      description: ['']
    })
    // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    this.bindLoginData = this.getLoginDetails;
    this.getallIPs();
  }
getallIPs() {
  this.settingsService.getIP(this.getallIp).subscribe(fetchIp => {
    this.IP = fetchIp.reverse();
    this.IPlength = this.IP.length;
    // console.log('IP',fetchIp);
  })
}
// create new ip
createnewIP() {
  this.crtnewIp = {
    Id: '',
    IPAddress: this.IPForm.value.ip,
    Description: this.IPForm.value.description,
    UserId: this.bindLoginData.UserId
  }
this.settingsService.crtIp(this.crtnewIp).subscribe(getnewip => {
  this.newip = getnewip;
  this.IPForm.reset();
  this.getallIPs();
  // console.log('newip',getnewip);
})
}
// edt ip popup
edtIppopup(wholeipdata) {
  const initialState = {
    title: 'Edit Ip',
    selectedipdata: wholeipdata,
    // for div close or hide
    editIP: 'editIP'
  };
  // tslint:disable-next-line: max-line-length
  this.bsModalRef = this.modalService.show(CreateEditWoorkflowsComponent, Object.assign({ show: true }, { class: 'modal450', initialState }));
  this.bsModalRef.content.closeBtnName = 'Cancel';
  this.bsModalRef.content.clddata.subscribe(() => {
    this.getallIPs();
  });
}
deletbtn(val, userid) {
  this.UserId = userid
  if (val === true) {
    this.deletbtnn = false;
    this.selectedchkbxfrdltIP.push(userid);
  } else {
    this.deletbtnn = true;
    this.selectedchkbxfrdltIP.splice(this.selectedchkbxfrdltIP.indexOf(userid), 1)
  }
}
// dlt ip
opendltippopup() {
  const initialState = {
    title: 'Delete Item',
    userIdofIP: this.selectedchkbxfrdltIP,
    // for div close or hide
    rmvIP: 'rmvIP'
  };
  // tslint:disable-next-line: max-line-length
  this.bsModalRef = this.modalService.show(DeleteComponent, Object.assign({  show: true }, { class: 'modal450', initialState }));
  this.bsModalRef.content.closeBtnName = 'Cancel';
  this.bsModalRef.content.clddata.subscribe(() => {
    this.getallIPs();
  });
}
}
