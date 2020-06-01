import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-affilatenewuser',
  templateUrl: './affilatenewuser.component.html',
  styleUrls: ['./affilatenewuser.component.css']
})
export class AffilatenewuserComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  createuser: any;
  addrole: any;
  crtusr = false;
  adrole = false;
  newRegisterForm: FormGroup;
  constructor(private bsmodal: BsModalRef, private fb: FormBuilder) { }

  ngOnInit() {
    if(this.createuser === 'createuser') {
      this.crtusr = true;
    } else {
      this.crtusr = false;
    }
    if(this.addrole === 'addrole') {
      this.adrole = true;
    } else {
      this.adrole = false;
    }
    this.newRegisterForm = this.fb.group({
      image: [''],
      firstname: [''],
      lastname: [''],
      username: [''],
      email: [''],
      phone: [''],
      disabled: [''],
      desk: [''],
      roles: [''],
      department: [''],
      shareddesks: [''],
      timezone: [''],
      culturecode: [''],
      uiculturecode: [''],
      startmodule: [''],
      defaultsendersetting: [''],
      sharedsendersettings: [''],
      password: [''],
      repeatpassword: [''],

      deskid: [''],
      rolesid: [''],
      departmentid: [''],
      shareddesksid: [''],
      timezoneid: [''],
      culturecodeid: [''],
      uiculturecodeid: [''],
      startmoduleid: [''],
      defaultsendersettingid: [''],
      sharedsendersettingsid: ['']
    });
  }
  hideModal() {
    this.bsmodal.hide();
  }

}
