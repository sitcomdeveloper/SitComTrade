import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from '../../header/clients/clients.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ImportClientDataComponent } from '../import-client-data/import-client-data.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-import-client',
  templateUrl: './import-client.component.html',
  styleUrls: ['./import-client.component.css']
})
export class ImportClientComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  importclientResponse: any;
  closefirstpopup = true;
  title: any;
  importExcelForm: FormGroup;
  technical: any
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private clientService: ClientsService, private bsmodal: BsModalRef, private modalService: BsModalService, private fb: FormBuilder) { }
    bsModalRef: BsModalRef;

  ngOnInit() {
    this.importExcelForm = this.fb.group({
      browsefiles: ['']
    })
  }
  importclientbyExcel() {
   // this.technical = event.target.result;
  //  const reader = new FileReader();
  //  reader.readAsDataURL(event.target.files[0]);
  //   this.technical = event.target.files[0];
  const formData = new FormData();
  formData.append('client_import_fileuploader', this.importExcelForm.value.browsefiles)
    // const colmnsHeader = {
    //   client_import_fileuploader: this.importExcelForm.value.browsefiles
    // };
    this.clientService.importClientByExcel(formData).subscribe(excel => {
      this.importclientResponse = excel;
      console.log('importclientResponse', excel);
    });
    // for opening next popup
    const initialState = {
      title: 'Import Clients',
      // static value for indicate that data come from that popup
      firstpopup: 'firstpopup',
      afterimportclient: this.importclientResponse,
    };
    this.bsModalRef = this.modalService.show(ImportClientDataComponent, Object.assign({ show: true }, { class: 'modal1250', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsmodal.hide();
    this.closefirstpopup = false;
  }
  // opennextpopup() {
  //   const initialState = {
  //     title: 'Import Clients',
  //   };
  //   // tslint:disable-next-line: max-line-length
  //   this.bsModalRef = this.modalService.show(ImportClientDataComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal1250', initialState }));
  //   this.bsModalRef.content.closeBtnName = 'Cancel';
  //   this.bsmodal.hide();
  //   this.closefirstpopup = false;
  // }
  hideModal() {
    this.bsmodal.hide();
  }
  // this.clientService.importClientByExcel(this.technical.name).subscribe(excel => {
}
