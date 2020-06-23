import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-additional-module-fields',
  templateUrl: './additional-module-fields.component.html',
  styleUrls: ['./additional-module-fields.component.css']
})
export class AdditionalModuleFieldsComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  title: any;
  addclnt = false;
  edtclnt = false;
  addclntaddtonlfld: string;
  edtclntaddtnlfld: string;
  constructor(private bsmodal: BsModalRef) { }

  ngOnInit() {
    // client
    if (this.addclntaddtonlfld === 'addclntaddtonlfld') {
      this.addclnt = true;
    }
    else {
      this.addclnt = false;
    }
    if (this.edtclntaddtnlfld === 'edtclntaddtnlfld') {
      this.edtclnt = true;
    }
    else {
      this.edtclnt = false;
    }
    // monetry transaction
  }
  hideModal() {
    this.bsmodal.hide();
  }

}
