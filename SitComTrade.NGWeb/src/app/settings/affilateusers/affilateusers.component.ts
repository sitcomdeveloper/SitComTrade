import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AffilatenewuserComponent } from './affilatenewuser/affilatenewuser.component';

@Component({
  selector: 'app-affilateusers',
  templateUrl: './affilateusers.component.html',
  styleUrls: ['./affilateusers.component.css']
})
export class AffilateusersComponent implements OnInit {
  affiliateUsers: any;
  newuser = true;
  newrole = false;
  constructor(private settingsService: SettingsService, private modalService: BsModalService) { }
  bsModalRef: BsModalRef;

  ngOnInit() {
    this.getUsersData();
  }
  // get all afiliate users
  getUsersData() {
    this.settingsService.getAffilateUsers().subscribe(res => {
      this.affiliateUsers = res;
      console.log('affiliateUsers', res);
    });
  }
  // for adjust tabs
  users() {
    this.newuser = true;
    this.newrole = false;
  }
  userroles() {
    this.newuser = false;
    this.newrole = true;
  }
  // for opening popup
  newuserpopup() {
    const initialState = {
      title: 'Create User',
      createuser: 'createuser'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(AffilatenewuserComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal930', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    // this.bsModalRef.content.clddata.subscribe(data => {
    //   this.userDetails();

    // });
  }
  newrolepopup() {
    const initialState = {
      title: 'Add Role',
      addrole: 'addrole'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(AffilatenewuserComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal930', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    // this.bsModalRef.content.clddata.subscribe(data => {
    //   this.userDetails();

    // });
  }

}
