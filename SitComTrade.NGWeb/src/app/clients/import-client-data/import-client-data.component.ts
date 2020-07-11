import { Component, OnInit } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ImprtclntdtaComponent } from '../imprtclntdta/imprtclntdta.component';

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
  
  constructor(private modalService: BsModalService, private bsmodal: BsModalRef) { }
  bsModalRef: BsModalRef;
  closesecondpopup = true;

  ngOnInit() {
    if(this.firstpopup === 'firstpopup') {
      this.assignResponse = this.afterimportclient;
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
