import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CrmnewuserComponent } from './crmnewuser/crmnewuser.component';
import { CrmedituserComponent } from './crmedituser/crmedituser.component';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-crmusers',
  templateUrl: './crmusers.component.html',
  styleUrls: ['./crmusers.component.css']
})
export class CrmusersComponent implements OnInit {
  getLoginDetails: any;
  bindLoginData: any;
  bsModalRef: BsModalRef;
  GetUser: any;
  constructor(private modalService: BsModalService, private settingsService: SettingsService) {}

  ngOnInit() {
     // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    console.log('LoginData', this.getLoginDetails);
    this.bindLoginData = this.getLoginDetails;

     this.getAllUsers();
  }
  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
  }
  // get all crm users
  getAllUsers() {
this.settingsService.getAllCrmUsers(this.bindLoginData.UserId).subscribe(getuser => {
  this.GetUser = getuser;
  console.log('GetUser', getuser);
})
  }
  // open popup for create new user
  newcrmUser() {
    const initialState = {
      title: 'Create User',
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(CrmnewuserComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal930', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    // this.bsModalRef.content.clddata.subscribe(data => {
    //   this.userDetails();

    // });
  }
  // popup for edit user
  openEditUser() {
    const initialState = {
      title: 'Update User Info',
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(CrmedituserComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal930', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    // this.bsModalRef.content.clddata.subscribe(data => {
    //   this.userDetails();

    // });
  }

}
