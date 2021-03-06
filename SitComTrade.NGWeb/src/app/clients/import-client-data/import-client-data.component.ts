import { Component, OnInit } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ImprtclntdtaComponent } from '../imprtclntdta/imprtclntdta.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as $ from 'jquery'
import { ClientsService } from 'src/app/header/clients/clients.service';
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
  excelfile: any;

  constructor(private modalService: BsModalService, private bsmodal: BsModalRef, private fb: FormBuilder, private clientsService: ClientsService) { }
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
// document.getElementsByClassName("valign-label"),"this.assignResponse[i]";
// }
// return;
// document.getElementsByClassName('valign-label').innerHTML = 'Hi, I am Arun Banik';

    }
  }
  openthirdpopup() {
    const formData: FormData = new FormData();
    formData.append("filename", this.assignResponse.FileName);
    // console.log(formy.get("firstname"))
    // filename: this.assignResponse.FileName 
    this.clientsService.sendExcelBack(formData).subscribe(sndexcl => {
      this.excelfile = sndexcl;
      console.log('excelfile',sndexcl);
    })
    const initialState = {
      title: 'Import Client',
    };
    this.closesecondpopup = false;
    this.bsmodal.hide();
    //  filename: this.assignResponse.FileName 
    
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(ImprtclntdtaComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal750', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
  }
  hideModal() {
    this.bsmodal.hide();
  }

}
