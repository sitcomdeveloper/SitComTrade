import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-create-sender-sttings',
  templateUrl: './create-sender-sttings.component.html',
  styleUrls: ['./create-sender-sttings.component.css']
})
export class CreateSenderSttingsComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  title: any;
  createemailsttings = false;
  editemailsettings = false;
  crtemlsttings: any;
  edtemlsettngs: any;
  constructor(private bsmodal: BsModalRef) { }

  ngOnInit() {
    if(this.crtemlsttings === 'crtemlsttings') {
      this.createemailsttings = true;
    } else {
      this.createemailsttings = false;
    }
    if(this.edtemlsettngs === 'edtemlsettngs') {
      this.editemailsettings = true;
    } else {
      this.editemailsettings = false;
    }
  }
  hideModal() {
    this.bsmodal.hide();
  }

}
