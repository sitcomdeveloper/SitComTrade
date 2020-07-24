import { Component, OnInit } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ImprtclntdtaComponent } from '../imprtclntdta/imprtclntdta.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-import-client-data',
  templateUrl: './import-client-data.component.html',
  styleUrls: ['./import-client-data.component.css']
})
export class ImportClientDataComponent implements OnInit {
  title: any;
  firstpopup: string;
  afterimportclient: any;
  assignResponse: any;
  HeaderForm: FormGroup;
  constructor(private modalService: BsModalService, private bsmodal: BsModalRef, private fb: FormBuilder) { }
  bsModalRef: BsModalRef;
  closesecondpopup = true;

  ngOnInit() {
    this.HeaderForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: ['']
    })
    if(this.firstpopup === 'firstpopup') {
      this.assignResponse = this.afterimportclient;
      console.log('headers',this.assignResponse);

// Loop through all the items in drop down list
// for (var i = 0; i< this.assignResponse.length; i++)
// { 
// if (this.assignResponse[i] === "First Name")
// {
// // Item is found. Set its property and exit
// this.assignResponse[i].selected = true;
// break;
// }
// }
// return;

// setSelectedIndex(document.getElementById("ddl_example5"),"BB");

      this.HeaderForm.setValue({
        firstname: 'First Name',
        lastname: 'Last Name',
        email: "Email"
      })
    }
  }
  openthirdpopup() {
    const initialState = {
      title: 'Import Client',
    };
    this.closesecondpopup = false;
    this.bsmodal.hide();
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(ImprtclntdtaComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal750', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
  }
  hideModal() {
    this.bsmodal.hide();
  }

}
