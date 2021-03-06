import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from '../../header/clients/clients.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ImportClientDataComponent } from '../import-client-data/import-client-data.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as $ from 'jquery'
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
  uploadedFile: File;
  arraytype = [];
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private clientService: ClientsService, private bsmodal: BsModalRef, private modalService: BsModalService, private fb: FormBuilder) { }
    bsModalRef: BsModalRef;

  ngOnInit() {
    this.importExcelForm = this.fb.group({
      browsefiles: ['']
    })
  }
  file_name_show(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.uploadedFile = fileList[0];
      let fileSize: number = fileList[0].size;
    }
      var file = $('#file-upload')[0].files[0].name;
      var size = $('#file-upload')[0].files[0].size;
      var size = size / 1024
      $("#files_name").html('<hr><i class="fa fa-file" aria-hidden="true"></i>  ' + file + "    size : " + size.toFixed(2) + " KB" + '           <a href="javascript:void(0)"><i class="fa fa-times" aria-hidden="true" onclick="file_name_remove()"></i></a><hr>');
    }

  importclientbyExcel() {
    const formData: FormData = new FormData();
    formData.append("client_import_fileuploader", this.uploadedFile);
    this.clientService.importClientByExcel(formData).subscribe(excel => {
      this.importclientResponse = excel;
      this.arraytype = this.importclientResponse
      console.log('importclientResponse', excel);
       // for opening next popup
      if(this.importclientResponse === this.arraytype) {
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
    }); 
  }
  hideModal() {
    this.bsmodal.hide();
  }
  // this.clientService.importClientByExcel(this.technical.name).subscribe(excel => {
}
