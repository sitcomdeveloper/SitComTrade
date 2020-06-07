import { Component, OnInit } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  todayDate: Date = new Date();
  router: any;
  getLoginDetails: any;
  bindLoginData: any;
  filled: any;
  GetUser: any;
 
  constructor(private modalService: BsModalService, private settingsService:SettingsService) { }
  bsModalRef: BsModalRef;

  ngOnInit() {
    // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    this.bindLoginData = this.getLoginDetails;

    this.getAllUsers();
  }
  logout() {
    // localStorage.removeItem('uid');
    window.sessionStorage.clear();
    this.router.navigate(['login']);
  }
  getAllUsers() {
    this.settingsService.getAllCrmUsers(this.bindLoginData.UserId).subscribe(getuser => {
      this.GetUser = getuser.reverse();
    })
  }
  // edit login user
  editLoginUser(whleusrdtls) {
    const initialState = {
      title: 'User Details',
      wholeuserdetails: whleusrdtls
    };
    this.bsModalRef = this.modalService.show(UserdetailsComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal650', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      this.getAllUsers();
    });
  }

}
