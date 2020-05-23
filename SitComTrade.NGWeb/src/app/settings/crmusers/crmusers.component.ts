import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CrmnewuserComponent } from './crmnewuser/crmnewuser.component';

@Component({
  selector: 'app-crmusers',
  templateUrl: './crmusers.component.html',
  styleUrls: ['./crmusers.component.css']
})
export class CrmusersComponent implements OnInit {
  getLoginDetails: any;
  bindLoginData: any;
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit() {
     // code for receiving login details and bind to header at place of name
     this.getLoginDetails = JSON.parse(localStorage.getItem('project'));
     this.bindLoginData = this.getLoginDetails;
  }
  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
  }
  // open popup fofr create new user
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

}
