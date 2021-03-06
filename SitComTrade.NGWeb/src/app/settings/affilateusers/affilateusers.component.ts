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
  // affiliateUsers: any;
  newuser = true;
  newrole = false;
  afilteusers: any;
  getLoginDetails: any;
  bindLoginData: any;
  isaffiliate: any;
  affiliateUsers: any;
  affusrlength: any;
  constructor(private settingsService: SettingsService, private modalService: BsModalService) { }
  bsModalRef: BsModalRef;

  ngOnInit() {
    // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    this.bindLoginData = this.getLoginDetails;
    
    this.getUsersData();
  }
  // get all afiliate users
  getUsersData() {
    this.settingsService.getAffilateUsers(this.bindLoginData.UserId).subscribe(res => {
      this.isaffiliate = res;
      this.affiliateUsers = this.isaffiliate.filter(useraffiliate => {
        if(useraffiliate.AffiliateFieldName === 'Affilate') {
        return useraffiliate;
        }
      })
      this.affusrlength = this.affiliateUsers.length;
      // console.log('isaffiliate', res);
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
    this.bsModalRef.content.clddata.subscribe(data => {
      this.getUsersData();
    });
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
