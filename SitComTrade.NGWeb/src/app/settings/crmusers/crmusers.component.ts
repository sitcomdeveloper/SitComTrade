import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-crmusers',
  templateUrl: './crmusers.component.html',
  styleUrls: ['./crmusers.component.css']
})
export class CrmusersComponent implements OnInit {
  getLoginDetails: any;
  bindLoginData: any;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit() {
     // code for receiving login details and bind to header at place of name
     this.getLoginDetails = JSON.parse(localStorage.getItem('project'));
     this.bindLoginData = this.getLoginDetails;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
