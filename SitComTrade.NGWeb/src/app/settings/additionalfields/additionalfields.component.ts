import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AdditionalModuleFieldsComponent } from './additional-module-fields/additional-module-fields.component';

@Component({
  selector: 'app-additionalfields',
  templateUrl: './additionalfields.component.html',
  styleUrls: ['./additionalfields.component.css']
})
export class AdditionalfieldsComponent implements OnInit {

  constructor(private modalService: BsModalService) { }
  bsModalRef: BsModalRef;
  ngOnInit() {
  }
addclientadditionalfield() {
  const initialState = {
    title: 'Create Field',
    addclntaddtonlfld: 'addclntaddtonlfld'
  };
  // tslint:disable-next-line: max-line-length
  this.bsModalRef = this.modalService.show(AdditionalModuleFieldsComponent, Object.assign({ show: true }, { class: 'modal450', initialState }));
  this.bsModalRef.content.closeBtnName = 'Cancel';
  // this.bsModalRef.content.clddata.subscribe(() => {
  //   this.userDetails();
  // });
}
  editclientadditionalfield() {
    const initialState = {
      title: 'Edit Field',
      edtclntaddtnlfld: 'edtclntaddtnlfld'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(AdditionalModuleFieldsComponent, Object.assign({ show: true }, { class: 'modal450', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    // this.bsModalRef.content.clddata.subscribe(() => {
    //   this.userDetails();
    // });
  }

}
