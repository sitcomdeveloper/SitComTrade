import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CrmnewuserComponent } from './crmnewuser/crmnewuser.component';
import { CrmedituserComponent } from './crmedituser/crmedituser.component';
import { SettingsService } from '../settings.service';
import * as $ from 'jquery'
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
  crmuserlength: any;
  constructor(private modalService: BsModalService, private settingsService: SettingsService) {}

  ngOnInit() {
     // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    this.bindLoginData = this.getLoginDetails;

     this.getAllUsers();

     $(document).ready(function () {
      $("#ckbCheckAll").click(function () {
          $(".checkBoxClass").prop('checked', $(this).prop('checked'));
          var chlength = $('.checkBoxClass:checked').length;
        $("#chked").html("<span>"+chlength+ " items checked from</span>");
      });
    })
  }
  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
  }
  // get all crm users
  getAllUsers() {
this.settingsService.getAllCrmUsers(this.bindLoginData.UserId).subscribe(getuser => {
  this.GetUser = getuser.reverse();
 this.crmuserlength = this.GetUser.length;
  // console.log('GetUser', getuser);
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
    this.bsModalRef.content.clddata.subscribe(data => {
      this.getAllUsers();
});
  }
  // popup for edit user
  openEditUser(completedata) {
    const initialState = {
      title: 'Update User Info',
      takewholedata: completedata
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(CrmedituserComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal930', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      this.getAllUsers();
    });
  }

}
