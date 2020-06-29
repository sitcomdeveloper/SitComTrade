import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-instruments',
  templateUrl: './create-instruments.component.html',
  styleUrls: ['./create-instruments.component.css']
})
export class CreateInstrumentsComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();

  crtinstrumnts: string;
  edtinstrmnts: string;
  createinstruments = false;
  editinsstrumnts = false;
  title: any;
  constructor(private bsmodal: BsModalRef) { }

  ngOnInit() {
    if(this.crtinstrumnts === 'crtinstrumnts') {
      this.createinstruments = true;
    } else {
      this.createinstruments = false;
    }
    if(this.edtinstrmnts === 'edtinstrmnts') {
      this.editinsstrumnts = true;
    } else {
      this.editinsstrumnts = false;
    }
  }
  hideModal() {
    this.bsmodal.hide();
  }
}
