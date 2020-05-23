import { Component, OnInit } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { UserdetailsComponent } from './userdetails/userdetails.component';

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
  constructor(private modalService: BsModalService) { }
  bsModalRef: BsModalRef;

  ngOnInit() {
    // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(localStorage.getItem('username'));
    console.log('LoginData', this.getLoginDetails);
    this.bindLoginData = this.getLoginDetails;
  }
  logout() {
    // localStorage.removeItem('uid');
    localStorage.clear();
    this.router.navigate(['login']);
  }
  open() {
    this.router.navigate(['login']);
  }
  // edit login user
  editLoginUser() {
    const initialState = {
      title: 'User Details',
    };
    
    this.bsModalRef = this.modalService.show(UserdetailsComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal650', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    // this.bsModalRef.content.clddata.subscribe(data => {
    //   this.userDetails();

    // });
  }

}
